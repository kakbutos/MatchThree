import React from 'react';
import App from './src/app';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { store } from './src/store';

// TODO COD-55 добавить провайдер Redux и Router, изменить путь к настоящему App
export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );
}
