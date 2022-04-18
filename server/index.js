import 'dotenv/config'
import http from 'http'
import express from 'express'
import * as socketIO from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new socketIO.Server(server)

const publicPathURL = new URL('./public', import.meta.url)

if (process.env.NODE_ENV === 'development') {
  const { devMiddleware } = await import('./dev-middleware.js')
  app.use(devMiddleware(publicPathURL.pathname))
}

app.use(express.static(publicPathURL.pathname))

app.get('/api/hello', (_req, res) => {
  res.json({ hello: 'world' })
})

server.listen(process.env.PORT, () => {
  console.log('app listening on port', process.env.PORT)
})
