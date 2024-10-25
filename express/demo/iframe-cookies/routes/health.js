const Router = require('express').Router()

Router.get('/', (req, res, next) => {
  return res.send('ok')
})

module.exports = Router
