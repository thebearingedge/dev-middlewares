import 'dotenv/config'
import express from 'express'

const app = express()
const publicPathURL = new URL('./public', import.meta.url)

if (process.env.NODE_ENV === 'development') {
  const { devMiddleware } = await import('./dev-middleware.js')
  app.use(devMiddleware(publicPathURL.pathname))
}

app.use(express.static(publicPathURL.pathname))

app.get('/api/hello', (_req, res) => {
  res.json({ hello: 'world' })
})

app.listen(process.env.PORT, () => {
  console.log('app listening on port', process.env.PORT)
})
