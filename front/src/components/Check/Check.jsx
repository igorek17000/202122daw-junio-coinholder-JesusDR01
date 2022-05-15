import React from 'react';
import { useTranslation } from 'react-i18next';

export const Check = () => {
  const {t} = useTranslation();
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="3"
      stroke="#21BF96"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
      <title id="copied-address">{t('dex.copied')}</title>
    </svg>
  );
};
