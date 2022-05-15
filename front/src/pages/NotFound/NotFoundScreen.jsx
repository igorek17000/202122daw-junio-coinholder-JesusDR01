import { useTranslation } from "react-i18next"

export const NotFoundScreen = () => {
const {t} =  useTranslation();
  return (
    <h1>{t('notFound')}</h1>
  )
}
