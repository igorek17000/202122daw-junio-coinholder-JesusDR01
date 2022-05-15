//@ts-check
import React, { useState, useEffect, useMemo } from 'react';
import { useMoralis } from 'react-moralis';
import useInchDex from 'hooks/useInchDex';
import { Card } from 'antd';
import { useTokenPrice } from 'react-moralis';
import { tokenValue } from 'helpers/formatters';
import { getWrappedNative } from 'helpers/networks';
import { StyledDex } from './DEX.styled';
import { FromTokenWrapper } from 'components/FromTokenWrapper/FromTokenWrapper';
import { SelectFromTokenModal } from 'components/SelectFromTokenModal/SelectFromTokenModal';
import { SelectToTokenModal } from 'components/SelectToTokenModal/SelectToTokenModal';
import { SwapBtn } from 'components/SwapBtn/SwapBtn';
import { SwapSummary } from 'components/SwapSummary/SwapSummary';
import { ToTokenWrapper } from 'components/ToTokenWrapper/ToTokenWrapper';
import { ArrowFromTokenToToken } from 'components/ArrowFromTokenToToken/ArrowFromTokenToToken';
import { useTranslation } from 'react-i18next';
import GenericModal from 'components/GenericModal';
import { Avatar, Box } from '@mui/material';
import { Typography } from 'antd';
import GenericErrorModal from 'components/GenericErrorModal';

const nativeAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

const chainIds = {
  '0x1': 'eth',
  '0x38': 'bsc',
  '0x89': 'polygon',
};

const getChainIdByName = (chainName) => {
  for (let chainId in chainIds) {
    if (chainIds[chainId] === chainName) return chainId;
  }
};

const IsNative = (address) => address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const DEX = ({ chain, customTokens = {} }) => {
  const { t } = useTranslation();
  const { trySwap, tokenList, getQuote, error, success, setSuccess, loading } = useInchDex(chain);
  console.log(error?.status);
  const { Moralis, isInitialized, chainId } = useMoralis();
  const [isFromModalActive, setFromModalActive] = useState(false);
  const [isToModalActive, setToModalActive] = useState(false);
  const [fromToken, setFromToken] = useState();
  const [toToken, setToToken] = useState();
  const [fromAmount, setFromAmount] = useState();
  const [quote, setQuote] = useState();
  const [currentTrade, setCurrentTrade] = useState();
  const { fetchTokenPrice } = useTokenPrice();
  const [tokenPricesUSD, setTokenPricesUSD] = useState({});
  const openSuccessModalState = useState(false);
  const [, setOpen] = openSuccessModalState;

  useEffect(() => {
    if (success) {
      setOpen(true);
    }
    return () => {
      setSuccess(null);
    };
  }, [success]);

  const tokens = useMemo(() => {
    return { ...customTokens, ...tokenList };
  }, [customTokens, tokenList]);

  const fromTokenPriceUsd = useMemo(
    () =>
      tokenPricesUSD?.[fromToken?.['address']] ? tokenPricesUSD[fromToken?.['address']] : null,
    [tokenPricesUSD, fromToken],
  );

  const toTokenPriceUsd = useMemo(
    () => (tokenPricesUSD?.[toToken?.['address']] ? tokenPricesUSD[toToken?.['address']] : null),
    [tokenPricesUSD, toToken],
  );

  const fromTokenAmountUsd = useMemo(() => {
    if (!fromTokenPriceUsd || !fromAmount) return null;
    return `~$ ${(fromAmount * fromTokenPriceUsd).toFixed(4)}`;
  }, [fromTokenPriceUsd, fromAmount]);

  const toTokenAmountUsd = useMemo(() => {
    if (!toTokenPriceUsd || !quote) return null;
    return `~$ ${(
      Moralis?.Units?.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals) * toTokenPriceUsd
    ).toFixed(4)}`;
  }, [toTokenPriceUsd, quote]);

  // tokenPrices
  useEffect(() => {
    if (!isInitialized || !fromToken || !chain) return null;
    const validatedChain = chain ? getChainIdByName(chain) : chainId;
    const tokenAddress = IsNative(fromToken['address'])
      ? getWrappedNative(validatedChain)
      : fromToken['address'];
    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price) =>
        setTokenPricesUSD({
          ...tokenPricesUSD,
          [fromToken['address']]: price['usdPrice'],
        }),
    });
  }, [chain, isInitialized, fromToken]);

  useEffect(() => {
    if (!isInitialized || !toToken || !chain) return null;
    const validatedChain = chain ? getChainIdByName(chain) : chainId;
    const tokenAddress = IsNative(toToken['address'])
      ? getWrappedNative(validatedChain)
      : toToken['address'];
    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price) =>
        setTokenPricesUSD({
          ...tokenPricesUSD,
          [toToken['address']]: price['usdPrice'],
        }),
    });
  }, [chain, isInitialized, toToken]);

  useEffect(() => {
    if (!tokens || fromToken) return null;
    setFromToken(tokens[nativeAddress]);
  }, [tokens, fromToken]);

  const ButtonState = useMemo(() => {
    if (chainIds?.[chainId] !== chain) return { isActive: false, text: t('dex.switch', { chain }) };

    if (!fromAmount) return { isActive: false, text: t('dex.amount') };
    if (fromAmount && currentTrade) return { isActive: true, text: t('dex.swap') };
    return { isActive: false, text: t('dex.selectTokens') };
  }, [fromAmount, currentTrade, chainId, chain]);

  useEffect(() => {
    if (fromToken && toToken && fromAmount)
      setCurrentTrade({ fromToken, toToken, fromAmount, chain });
  }, [toToken, fromToken, fromAmount, chain]);

  useEffect(() => {
    if (currentTrade) getQuote(currentTrade).then((quote) => setQuote(quote));
    // console.log(currentTrade);
  }, [currentTrade]);

  const isValidQuote = !(!quote || !tokenPricesUSD?.[toToken?.['address']]);
  const quoteError = quote?.statusCode === 400 ? quote?.message : '';

  let formattedPrice = '';
  if (isValidQuote && !quoteError) {
    const { fromTokenAmount, toTokenAmount } = quote;
    const { symbol: fromSymbol } = fromToken;
    const { symbol: toSymbol } = toToken;
    const pricePerToken = parseFloat(
      tokenValue(fromTokenAmount, fromToken['decimals']) /
        tokenValue(toTokenAmount, toToken['decimals']),
    ).toFixed(6);
    formattedPrice = `1 ${toSymbol} = ${pricePerToken} ${fromSymbol} ($${tokenPricesUSD[
      [toToken['address']]
    ].toFixed(6)})`;
  }

  return (
    <StyledDex>
      <Card id="dex-body">
        <FromTokenWrapper
          setFromAmount={setFromAmount}
          fromAmount={fromAmount}
          fromTokenAmountUsd={fromTokenAmountUsd}
          setFromModalActive={setFromModalActive}
          fromToken={fromToken}
        />

        <ArrowFromTokenToToken />

        <ToTokenWrapper
          quote={quote}
          toTokenAmountUsd={toTokenAmountUsd}
          setToModalActive={setToModalActive}
          toToken={toToken}
          Moralis={Moralis}
        />

        {quote && (
          <SwapSummary
            quote={quote}
            isValidQuote={isValidQuote}
            formattedPrice={formattedPrice}
            quoteError={quoteError}
          />
        )}
        <SwapBtn  loading={loading} buttonState={ButtonState} trySwap={trySwap} currentTrade={currentTrade} />
      </Card>

      <SelectFromTokenModal
        isFromModalActive={isFromModalActive}
        setFromModalActive={setFromModalActive}
        setFromToken={setFromToken}
        tokens={tokens}
      />
      <SelectToTokenModal
        isToModalActive={isToModalActive}
        setToModalActive={setToModalActive}
        setToToken={setToToken}
        tokens={tokens}
      />

      <GenericErrorModal error={error} />

      <GenericModal openState={openSuccessModalState}>
        <Box id="success">
          <Avatar id="success-img" src="assets/check-modal.png" />
          <Typography>{t(`completed.generic`)}</Typography>
        </Box>
      </GenericModal>
    </StyledDex>
  );
};

export default DEX;
