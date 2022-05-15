import React from 'react';
import { StyledSwapSummary } from './SwapSummary.styled';
import Text from 'antd/lib/typography/Text';
import { useTranslation } from 'react-i18next';
import { PriceSwap } from '../PriceSwap/PriceSwap';
export const SwapSummary = ({ quote, isValidQuote, formattedPrice, quoteError }) => {
  const { t } = useTranslation();
  return (
    <StyledSwapSummary>
      <Text id="swap-summary">
        {t('dex.swapSummary')}
        <Text>{quote?.estimatedGas}</Text>
      </Text>
      <PriceSwap isValidQuote={isValidQuote} price={formattedPrice} quoteError={quoteError} />
    </StyledSwapSummary>
  );
};
