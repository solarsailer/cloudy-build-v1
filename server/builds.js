'use strict'

const request = require('./request')
const Constants = require('./constants')

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

function getLastSuccessfulBuilds (org, project, key) {
  const opts = {
    url: Constants.API_BASE_URL + getBuildsUrl(org, project),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${key}`
    }
  }

  return request(opts).then(parseBuilds)
}

function parseBuilds (data) {
  const json = JSON.parse(data)
  const result = {}

  for (var item of json) {
    const platform = item.buildtargetid
    const id = item.build

    if (!result[platform] || result[platform] < id) {
      result[platform] = id
    }
  }

  return result
}

function getBuildsUrl (org, project) {
  return `/orgs/${org}/projects/${project}/buildtargets/_all/builds?buildStatus=success`
}

// -------------------------------------------------------------
// Exports.
// -------------------------------------------------------------

module.exports = {
  getLastSuccessfulBuilds
}
