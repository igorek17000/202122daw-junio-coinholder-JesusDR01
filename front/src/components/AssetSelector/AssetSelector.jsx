import { useERC20Balance } from 'hooks/useERC20Balance';
import { useNativeBalance } from 'react-moralis';
import { Select } from 'antd';
import { useMemo } from 'react';
import { StyledAssetSelector } from './AssetSelector.styled';
import { AssetSelectorOption } from 'components/AssetSelectorOption/AssetSelectorOption';

export default function AssetSelector({ setAsset }) {
  const { assets } = useERC20Balance();
  const { data: nativeBalance, nativeToken } = useNativeBalance();

  const fullBalance = useMemo(() => {
    if (!assets || !nativeBalance || assets.length === 0) return null;
    return [
      ...assets,
      {
        balance: nativeBalance?.balance,
        decimals: nativeToken?.decimals || 18,
        name: nativeToken?.name,
        symbol: nativeToken?.symbol,
        token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      },
    ];
  }, [assets, nativeBalance, nativeToken]);

  function handleChange(value) {
    const token = fullBalance.find((token) => token.token_address === value);
    setAsset(token);
  }

  return (
    <StyledAssetSelector
      filterOption={(input, option) => option.key.toLowerCase().includes(input.toLowerCase())}
      showSearch={true}
      onChange={handleChange}
      size="large"
    >
      {fullBalance &&
        fullBalance.map((item) => {
          return (
            <Select.Option value={item['token_address']} key={item['symbol']}>
              <AssetSelectorOption item={item} />
            </Select.Option>
          );
        })}
    </StyledAssetSelector>
  );
}
