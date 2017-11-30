'use strict'

const request = require('./request')
const Constants = require('./constants')

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

function getLastSuccessfulBuilds (org, key) {
  return request(getProjectsUrl(key))
    .then(parseProjects)
    .then(projects => {
      const promises = projects
        .map(id => getBuildsUrl(key, org, id))
        .map(request)

      return Promise.all(promises)
    })
    .then(urls => urls.map(parseBuilds))
    .then(builds => {
      console.log
    })
}

function getProjectsUrl (key) {
  return createRequestOptions(key, `/projects`)
}

function getBuildsUrl (key, org, project) {
  return createRequestOptions(
    key,
    `/orgs/${org}/projects/${project}/buildtargets/_all/builds?buildStatus=success`
  )
}

function getShareUrl (key, org, project, target, number) {
  return createRequestOptions(
    key,
    `/orgs/${org}/projects/${project}/buildtargets/${target}/builds/${number}/share`
  )
}

function createRequestOptions (key, endpoint) {
  const opts = {
    url: Constants.API_BASE_URL + endpoint,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${key}`
    }
  }

  return opts
}

function parseProjects (data) {
  return JSON.parse(data).reduce((array, val) => {
    return [...array, val.projectid]
  }, [])
}

function parseBuilds (data) {
  const json = JSON.parse(data)
  const result = {}

  for (var item of json) {
    const project = item.projectId
    const target = item.buildtargetid
    const number = item.build

    if (!result[target] || result[target] < number) {
      result[target] = number
      result.project = project
    }
  }

  return result
}

// -------------------------------------------------------------
// Exports.
// -------------------------------------------------------------

module.exports = {
  getLastSuccessfulBuilds
}
