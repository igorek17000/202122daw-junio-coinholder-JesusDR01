// @ts-check
import React from 'react';
import Text from 'antd/lib/typography/Text';
import { StyledPriceSwap } from './PriceSwap.styled';
import { useTranslation } from 'react-i18next';

export const PriceSwap = ({ isValidQuote, quoteError, price }) => {
  const {t} = useTranslation();
  if (!isValidQuote) return null;
  if (quoteError) return <>{quoteError}</>;

  return (
    <StyledPriceSwap>
      {t('dex.price')}
      <Text>{price}</Text>
    </StyledPriceSwap>
  );
};
