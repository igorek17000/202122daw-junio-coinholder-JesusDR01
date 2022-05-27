import React from 'react';
import { StyledToTokenWrapper } from './ToTokenWrapper.styled';
import { Button, Image, Input } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useTranslation } from 'react-i18next';
import { Arrow } from 'components/Arrow/Arrow';
import { Paper } from '@mui/material';

export const ToTokenWrapper = ({ quote, toTokenAmountUsd, setToModalActive, toToken, Moralis }) => {
  const { t } = useTranslation();
  return (
    <StyledToTokenWrapper>
      <label htmlFor="to-input">{t('dex.to')}</label>
      <div id="input-wrapper">
        <div>
          <Input
            id="to-input"
            bordered={false}
            placeholder="0.00"
            readOnly
            value={
              quote
                ? parseFloat(
                    Moralis?.Units?.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals),
                  ).toFixed(6)
                : ''
            }
          />
          <Text id="amount">{toTokenAmountUsd}</Text>
        </div>
        <Paper>
          <Button
            id="select-coin"
            onClick={() => setToModalActive(true)}
            type={toToken ? 'default' : 'primary'}
          >
            {toToken ? (
              <Image
                src={toToken?.logoURI || 'https://etherscan.io/images/main/empty-token.png'}
                alt="nologo"
                preview={false}
              />
            ) : (
              <span>{t('dex.selectToken')}</span>
            )}
            <span>{toToken?.symbol}</span>
            <Arrow />
          </Button>
        </Paper>
      </div>
    </StyledToTokenWrapper>
  );
};
