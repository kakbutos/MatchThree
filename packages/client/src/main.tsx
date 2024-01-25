import { hydrateRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { startServiceWorker } from './utils/start-service-worker';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение'
  );
}

// TODO COD-55 раскомментировать и вернуть настоящий App при подключении Router и Redux
hydrateRoot(
  container,
  // <BrowserRouter>
  // <Provider store={store}>
  <App />
  // </Provider>
  // </BrowserRouter>
);

startServiceWorker();
