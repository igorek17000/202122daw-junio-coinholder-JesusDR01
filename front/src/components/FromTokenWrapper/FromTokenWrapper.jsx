import React from 'react';
import { StyledFromTokenWrapper } from './FromTokenWrapper.styled';
import { Button, Image, InputNumber } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useTranslation } from 'react-i18next';
import { Arrow } from 'components/Arrow/Arrow';

export const FromTokenWrapper = ({
  setFromAmount,
  fromAmount,
  fromTokenAmountUsd,
  setFromModalActive,
  fromToken,
}) => {
  const { t } = useTranslation();
  return (
    <StyledFromTokenWrapper>
      <label htmlFor="from-input">{t('dex.from')}</label>
      <div id="input-wrapper">
        <div>
          <InputNumber
            id="from-input"
            bordered={false}
            placeholder="0.00"
            onChange={setFromAmount}
            value={fromAmount}
          />
          <Text id="amount">{fromTokenAmountUsd}</Text>
        </div>
        <Button id="select-coin" onClick={() => setFromModalActive(true)}>
          {fromToken ? (
            <Image
              src={fromToken?.logoURI || 'https://etherscan.io/images/main/empty-token.png'}
              alt="nologo"
              preview={false}
            />
          ) : (
            <span>{t('dex.selectToken')}</span>
          )}
          <span>{fromToken?.symbol}</span>
          <Arrow />
        </Button>
      </div>
    </StyledFromTokenWrapper>
  );
};
