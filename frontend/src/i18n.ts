import i18n from "i18next";
import Backend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(Backend)
    .use(LanguageDetector)
    .init({
        detection: {
            order: [
                'querystring',
                'navigator',
                'cookie',
                'localStorage',
                'sessionStorage',
                'htmlTag',
                'path',
                'subdomain'
            ]
        },
        fallbackLng: 'en',
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;