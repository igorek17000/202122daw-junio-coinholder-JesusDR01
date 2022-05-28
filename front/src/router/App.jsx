//@ts-check
import React from 'react';
import { Fragment, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WithHeader } from 'components/WithHeader/WithHeader';
import { AuthRoute } from './PrivateRoute';
import { PortfoliosLayout } from 'components/PortfoliosLayout/PortfoliosLayout';
import { GenericLayout } from 'components/GenericLayout/GenericLayout';

import { PortfoliosScreen } from 'pages/Portfolios/PortfoliosScreen';
import { ForgotPasswordScreen } from 'pages/ForgotPassword/ForgotPasswordScreen';
import { NotFoundScreen } from 'pages/NotFound/NotFoundScreen';
import SignUpScreen from 'pages/SignUp/SignUpScreen';
import { LoginScreen } from 'pages/Login/Login';
import { ProfileScreen } from 'pages/Profile/ProfileScreen';

import { DexScreen } from 'pages/Dex/DexScreen';
import { NFTBalanceScreen } from 'pages/NFTBalance/NFTBalanceScreen';
import { WalletScreen } from 'pages/Wallet/WalletScreen';
import { RamperScreen } from 'pages/Ramper/Ramper';
import { ImportScreen } from 'pages/Import/ImportScreen';
import { BinanceScreen } from 'pages/Binance/BinanceScreen';
import { KucoinScreen } from 'pages/Kucoin/KucoinScreen';
import { WalletImportScreen } from 'pages/WalletImport/WalletImportScreen';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { cfg } from 'config/config';
import RecoverPasswordScreen from 'pages/RecoverPassword';
import { WalletRoute } from './WalletRoute';
import FaqScreen from 'pages/Faq';
import AboutScreen from 'pages/About';
const AppRouter = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();
  
  useEffect(() => {
    const connectorId = window.localStorage.getItem('connectorId');
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading){
      enableWeb3({ provider: connectorId });
    }
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="*" element={<Navigate to="not-found" />} />

          <Route element={<WithHeader />}>
            <Route element={<GenericLayout />}>
              <Route path="/not-found" element={<NotFoundScreen />} />

              <Route element={<AuthRoute type="guest" />}>
                <Route
                  path="/login"
                  element={
                    <GoogleReCaptchaProvider reCaptchaKey={cfg.captcha.site}>
                      <LoginScreen />
                    </GoogleReCaptchaProvider>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <GoogleReCaptchaProvider reCaptchaKey={cfg.captcha.site}>
                      <SignUpScreen />
                    </GoogleReCaptchaProvider>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <GoogleReCaptchaProvider reCaptchaKey={cfg.captcha.site}>
                      <ForgotPasswordScreen />
                    </GoogleReCaptchaProvider>
                  }
                />
                <Route
                  path="/reset/:id"
                  element={
                    <GoogleReCaptchaProvider reCaptchaKey={cfg.captcha.site}>
                      <RecoverPasswordScreen />
                    </GoogleReCaptchaProvider>
                  }
                />
              </Route>

              <Route element={<WalletRoute />}>
                <Route path="/wallet" element={<WalletScreen />} />
                <Route path="/1inch" element={<DexScreen />} />
                <Route path="/nftBalance" element={<NFTBalanceScreen />} />
              </Route>

              <Route path="/onramp" element={<RamperScreen />} />
              <Route path="/faq" element={<FaqScreen />} />
              <Route path="/about" element={<AboutScreen />} />
            </Route>

            <Route element={<PortfoliosLayout />}>
              <Route element={<AuthRoute type="private" />}>
                <Route
                  path="/"
                  element={
                    <GoogleReCaptchaProvider reCaptchaKey={cfg.captcha.site}>
                      <PortfoliosScreen />
                    </GoogleReCaptchaProvider>
                  }
                />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/import" element={<ImportScreen />} />
                <Route path="/binance" element={<BinanceScreen />} />
                <Route path="/kucoin" element={<KucoinScreen />} />
                <Route path="/walletImport" element={<WalletImportScreen />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Fragment>
    </Router>
  );
};

export default AppRouter;
