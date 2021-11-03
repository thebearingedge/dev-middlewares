import 'dotenv/config'
import path from 'path'
import express from 'express'

const { pathname: __dirname } = new URL('.', import.meta.url)

const app = express()
const publicPath = path.join(__dirname, 'public')

if (process.env.NODE_ENV === 'development') {
  const { devMiddleware } = await import('./dev-middleware.js')
  app.use(devMiddleware(publicPath))
}

app.use(express.static(publicPath))

app.get('/api/hello', (_req, res) => {
  res.json({ hello: 'world' })
})

app.listen(3000, () => {
  console.log('app listening on port 3000')
})
