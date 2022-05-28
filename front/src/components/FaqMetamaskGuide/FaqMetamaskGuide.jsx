import React from 'react';
import { StyledFaqMetamaskGuide } from './FaqMetamaskGuide.styled';

import { useTranslation } from 'react-i18next';
import { Link, Typography } from '@mui/material';
export const FaqMetamaskGuide = () => {
  const { t } = useTranslation();
  //1. Descarga Metamask mediante <Link>Android / <Link>IOS
  //2. En la aplicación de Metamask inicia sesión en tu cuenta, dirígete a https://chainlist.org/ y añade las redes BSC y Polygon!
  //3. Dirígete a coinholder.tech y selecciona Metamask!
  //4. Ahora podrás seleccionar las redes de BSC, Polygon y Ethereum para poder disfrutar de todas nuestras funcionalidades!
  const ANDROID_METAMASK_LINK = 'https://play.google.com/store/apps/details?id=io.metamask';
  const IOS_METAMASK_LINK = 'https://apps.apple.com/app/metamask-blockchain-wallet/id1438144202';
  const CHAINLIST_LINK = 'https://chainlist.org/';
  return (
    <StyledFaqMetamaskGuide>
      <Typography>
        {t('faq.metamaskGuide.step1')}
        <Link target="_blank" href={ANDROID_METAMASK_LINK}>
          Android
        </Link>
        /
        <Link target="_blank" href={IOS_METAMASK_LINK}>
          IOS
        </Link>
      </Typography>
      <Typography>
        {t('faq.metamaskGuide.step2.1')}{' '}
        <Link target="_blank" href={CHAINLIST_LINK}>
          {t('faq.metamaskGuide.step2.2')}
        </Link>
        {t('faq.metamaskGuide.step2.3')}
      </Typography>
        <img src={t('faq.metamaskGuide.step2pic')}/>
      <Typography>{t('faq.metamaskGuide.step3')}</Typography>
        <img src={t('faq.metamaskGuide.step3pic')}/>
      <Typography>{t('faq.metamaskGuide.step4')}</Typography>
      <img src={t('faq.metamaskGuide.step4pic')}/>
    </StyledFaqMetamaskGuide>
  );
};
