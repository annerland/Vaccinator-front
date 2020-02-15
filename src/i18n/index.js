import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './languages/en'
import pt from './languages/pt'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    debug: true,
    useSuspense: false,
    resources: { en, pt }
  })

export default i18n
