import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { I18nProvider, useI18n } from './i18n/I18nProvider';
import { HashRouter } from 'react-router-dom';
import './index.css';

function Root() {
  const { lang } = useI18n();
  React.useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);
  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <I18nProvider>
        <Root />
      </I18nProvider>
    </HashRouter>
  </React.StrictMode>
);
