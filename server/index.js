import 'dotenv/config';
import http from 'http';
import express from 'express';
import * as socketIO from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server);

const publicPathURL = new URL('./public', import.meta.url);

if (process.env.NODE_ENV === 'development') {
  const { devMiddleware } = await import('./dev-middleware.js');
  app.use(devMiddleware(publicPathURL.pathname));
}

app.use(express.static(publicPathURL.pathname));

app.get('/api/hello', (_req, res) => {
  res.json({ hello: 'world' });
});

io.on('connection', socket => {
  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    console.log('client disconnected:', socket.id);
  });
  // eslint-disable-next-line no-console
  console.log('client connected:', socket.id);
});

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('app listening at', process.env.PORT);
});
