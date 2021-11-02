require('dotenv/config')
const path = require('path')
const express = require('express')

const app = express()

const publicPath = path.join(__dirname, 'public')

if (process.env.NODE_ENV === 'development') {
  const devMiddleware = require('./dev-middleware')
  app.use(devMiddleware(publicPath))
}

const staticMiddleware = express.static(publicPath)
app.use(staticMiddleware)

app.get('/api/hello', (_req, res) => {
  res.json({ hello: 'world' })
})

app.listen(3000, () => {
  console.log('app listening on port 3000')
})
