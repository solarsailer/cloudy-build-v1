'use strict'

const express = require('express')
const path = require('path')

const {getLastSuccessfulBuilds} = require('./builds')

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

module.exports = (port, root, callback) => {
  const app = express()

  app.use('/static', express.static(path.join(root, 'static')))

  app.get('/', (req, res) => {
    res.sendFile(path.join(root, 'views', 'index.html'))
  })

  // API endpoints.
  app.get('/builds', getBuilds)

  app.listen(port, callback)
}

// -------------------------------------------------------------
// /builds endpoint.
// -------------------------------------------------------------

function getBuilds (req, res) {
  const org = req.query.org
  const key = req.query.key

  getLastSuccessfulBuilds(org, key)
    .then(result => {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(result))
    })
    .catch(() => {
      res.status(500).send('/builds: cannot get the last successful builds for these parameters')
    })
}
