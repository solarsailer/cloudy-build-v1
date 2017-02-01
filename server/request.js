'use strict'

const requestAsync = require('request')

// -------------------------------------------------------
// Module.
// -------------------------------------------------------

// Wrap a request object into a Promise.
function request (opts) {
  return new Promise(function (resolve, reject) {
    requestAsync(opts, (error, response, data) => {
      if (error) {
        reject(error)
      }

      if (response.statusCode !== 200) {
        reject(response.statusCode)
      }

      resolve(data)
    })
  })
}

// -------------------------------------------------------
// Exports.
// -------------------------------------------------------

module.exports = request
