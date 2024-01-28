import dotenv from 'dotenv';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';

dotenv.config();

import * as fs from 'fs';
import { resolve, dirname } from 'path';
import express from 'express';
// import { createClientAndConnect } from './db';
import { getInitialState } from './store';

const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  // TODO вернуть при подключении к БД
  // createClientAndConnect();

  let vite: ViteDevServer | undefined;
  const distPath = dirname(require.resolve('client/dist/index.html'));
  const srcPath = dirname(require.resolve('client'));
  const ssrClientPath = require.resolve('client/dist-ssr/client.cjs');

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  if (!isDev()) {
    app.use('/assets', express.static(resolve(distPath, 'assets')));
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(
        resolve(!isDev() ? distPath : srcPath, 'index.html'),
        'utf-8'
      );

      if (isDev()) {
        template = await vite!.transformIndexHtml(url, template);
      }

      let render: (url: string, preloadedState: object) => Promise<string>;

      if (!isDev()) {
        render = (await import(ssrClientPath)).render;
      } else {
        render = (await vite!.ssrLoadModule(resolve(srcPath, 'ssr.tsx')))
          .render;
      }

      const preloadedState = await getInitialState();
      const stateMarkup = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
        preloadedState
      )}</script>`;

      const appHtml = await render(url, preloadedState);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml + stateMarkup);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
