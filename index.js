'use strict'

const server = require('./lib/server')

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

const port = process.env.PORT || 4000

server(port, __dirname, () => {
  console.log(`Server listening on http://localhost:${port}/`)
})
