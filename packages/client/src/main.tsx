import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { startServiceWorker } from './utils/start-service-worker';
import { Provider } from 'react-redux';
import { store } from './store';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение'
  );
}

// @ts-ignore
const preloadState = window.__PRELOADED_STATE__;
const storeProvider = store(preloadState);

// @ts-ignore
delete window.__PRELOADED_STATE__;

hydrateRoot(
  container,
  <BrowserRouter>
    <Provider store={storeProvider}>
      <App />
    </Provider>
  </BrowserRouter>
);

startServiceWorker();
