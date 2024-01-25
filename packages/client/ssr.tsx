import React from 'react';
import App from './src/App';
import { renderToString } from 'react-dom/server';

// TODO COD-55 добавить провайдер Redux и Router, изменить путь к настоящему App
export function render() {
  return renderToString(<App />);
}
