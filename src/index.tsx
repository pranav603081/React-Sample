import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import English from "./assets/lang/en.json";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: English },
    },
    lng: 'en', // sets the default language
    fallbackLng: 'en', // use English if the current language is not available
  });

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
