import { CreditCardOutlined } from '@ant-design/icons';
import { Button, Input, notification } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import AddressInput from '../AddressInput/AddressInput';
import AssetSelector from '../AssetSelector/AssetSelector';
import { StyledTransfer } from './Transfer.styled';
import { useTranslation } from 'react-i18next';
import ActionButton from 'components/ActionButton';

function Transfer() {
  const { t } = useTranslation();

  const { Moralis } = useMoralis();
  const [receiver, setReceiver] = useState();
  const [asset, setAsset] = useState();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    asset && amount && receiver ? setTx({ amount, receiver, asset }) : setTx();
  }, [asset, amount, receiver]);

  const openNotification = ({ message, description }) => {
    notification.open({
      placement: 'bottomRight',
      message,
      description,
    });
  };

  async function transfer() {
    const { amount, receiver, asset } = tx;

    let options = {};

    switch (asset.token_address) {
      case '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee':
        options = {
          native: 'native',
          amount: Moralis.Units.ETH(amount),
          receiver,
          awaitReceipt: false,
        };
        break;
      default:
        options = {
          type: 'erc20',
          amount: Moralis.Units.Token(amount, asset.decimals),
          receiver,
          contractAddress: asset.token_address,
          awaitReceipt: false,
        };
    }

    setIsPending(true);
    try {
      const txStatus = await Moralis.transfer(options);
      const result = await txStatus.wait();
      if (result) {
        openNotification({
          message: t('wallet.notification'),
          description: `${result.blockHash}`,
        });
      }
    } catch (err) {
      openNotification({
        message: t('error.unknown'),
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <StyledTransfer>
      <h3 id="title">{t('wallet.title')}</h3>

      <div className="input-wrapper">
        <label htmlFor="address">
          <Text strong>{t('wallet.address')}</Text>
        </label>
        <AddressInput onChange={setReceiver} />
      </div>

      <div className="input-wrapper">
        <label htmlFor="amount">
          <Text strong>{t('wallet.amount')}</Text>
        </label>
        <Input
          size="large"
          id="amount"
          autoComplete="off"
          prefix={<CreditCardOutlined />}
          onChange={(e) => {
            setAmount(`${e.target.value}`);
          }}
        />
      </div>

      <div className="input-wrapper">
        <label>
          <Text strong>{t('wallet.asset')}</Text>
        </label>
        <AssetSelector setAsset={setAsset} />
      </div>

      <ActionButton
        type="primary"
        size="large"
        onClick={() => transfer()}
        disabled={!tx || isPending}
      >
        {t('wallet.action')}
      </ActionButton>
    </StyledTransfer>
  );
}

export default Transfer;
