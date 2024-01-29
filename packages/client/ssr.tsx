// @ts-ignore
import React from 'react';
import App from './src/app';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { PreloadedState, store } from './src/store';

export function render(url: string, preloadedState: PreloadedState) {
  const storeProvider = store(preloadedState);

  return renderToString(
    <StaticRouter location={url}>
      <Provider store={storeProvider}>
        <App />
      </Provider>
    </StaticRouter>
  );
}
