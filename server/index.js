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
  app.get('/link', getShareLink)

  app.listen(port, callback)
}

// -------------------------------------------------------------
// /builds endpoint.
// -------------------------------------------------------------

function getBuilds (req, res) {
  const org = req.query.org
  const project = req.query.project
  const key = req.query.key

  getLastSuccessfulBuilds(org, project, key)
    .then(result => {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(result))
    })
    .catch(() => {
      res.status(404).send('/builds: cannot get the last successful builds for these parameters')
    })
}

// -------------------------------------------------------------
// /link endpoint.
// -------------------------------------------------------------

function getShareLink (req, res) {
  const build = req.query.build
}
