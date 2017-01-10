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

  app.get('/builds', (req, res) => {
    const org = req.query.org
    const project = req.query.project
    const key = req.query.key

    getLastSuccessfulBuilds(org, project, key)
      .then(result => {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(result))
      })
      .catch(() => {
        res.status(500).send('/builds: cannot get the last successful builds for these parameters')
      })
  })

  app.listen(port, callback)
}
