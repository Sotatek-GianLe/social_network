import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import next from 'next';
const PORT = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: dev });

const handler = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    const server = express();
   
    server.all('*', (req, res) => {
      return handler(req, res);
    });
    server.listen(PORT, () => {
      console.log(`> Server ready on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.log(err.message);
  });