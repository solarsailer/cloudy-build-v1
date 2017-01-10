'use strict'

const express = require('express')
const path = require('path')

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

module.exports = (port, root, callback) => {
  const app = express()

  app.use('/static', express.static(path.join(root, 'static')))

  app.get('/', (req, res) => {
    res.sendFile(path.join(root, 'views', 'index.html'))
  })

  app.listen(port, callback)
}
