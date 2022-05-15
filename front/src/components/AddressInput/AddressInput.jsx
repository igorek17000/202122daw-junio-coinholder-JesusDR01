import { useCallback, useEffect, useRef, useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { getEllipsisTxt } from '../../helpers/formatters';
import Blockie from '../Blockie/Blockie';
import { SearchOutlined } from '@ant-design/icons';
import { Cross } from 'components/Cross/Cross';
import { StyledAddressInput } from './AddressInput.styled';
import { useTranslation } from 'react-i18next';

function AddressInput(props) {
  const {t} = useTranslation();
  const input = useRef(null);
  const { web3 } = useMoralis();
  const [address, setAddress] = useState('');
  const [validatedAddress, setValidatedAddress] = useState('');
  const [isDomain, setIsDomain] = useState(false);
  const {
    resolve: { resolveDomain },
  } = useMoralisWeb3Api();

  useEffect(() => {
    if (validatedAddress) props.onChange(isDomain ? validatedAddress : address);
  }, [props, validatedAddress, isDomain, address]);

  const updateAddress = useCallback(
    async (value) => {
      setAddress(value);
      if (isSupportedDomain(value)) {
        const processPromise = function (promise) {
          promise
            .then((addr) => {
              setValidatedAddress(addr);
              setIsDomain(true);
            })
            .catch(() => {
              setValidatedAddress('');
            });
        };
        if (value.endsWith('.eth')) {
          processPromise(web3?.eth?.ens?.getAddress(value));
        } else {
          processPromise(
            resolveDomain({
              domain: value,
            }).then((r) => r?.address),
          );
        }
      } else if (value.length === 42) {
        setValidatedAddress(getEllipsisTxt(value, 10));
        setIsDomain(false);
      } else {
        setValidatedAddress('');
        setIsDomain(false);
      }
    },
    [resolveDomain, web3?.eth?.ens],
  );

  return (
    <StyledAddressInput
      validatedaddress={validatedAddress}
      id="address"
      ref={input}
      size="large"
      placeholder={props.placeholder ? props.placeholder : t('wallet.addressPlaceholder')}
      autoComplete="off"
      prefix={
        isDomain || address.length === 42 ? (
          <Blockie
            address={(isDomain ? validatedAddress : address).toLowerCase()}
            size={8}
            scale={3}
          />
        ) : (
          <SearchOutlined />
        )
      }
      suffix={
        validatedAddress && (
          <Cross setValidatedAddress={setValidatedAddress} setIsDomain={setIsDomain} />
        )
      }
      autoFocus={props.autoFocus}
      value={
        isDomain ? `${address} (${getEllipsisTxt(validatedAddress)})` : validatedAddress || address
      }
      onChange={(e) => {
        updateAddress(e.target.value);
      }}
      disabled={validatedAddress}
    />
  );
}

function isSupportedDomain(domain) {
  return [
    '.eth',
    '.crypto',
    '.coin',
    '.wallet',
    '.bitcoin',
    '.x',
    '.888',
    '.nft',
    '.dao',
    '.blockchain',
  ].some((tld) => domain.endsWith(tld));
}

export default AddressInput;
