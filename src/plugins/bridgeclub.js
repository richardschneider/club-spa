// A plugin that accesses the bridge club server.
// $bridgeclub is available to all vue instances.

import { EventBus } from '@/eventbus.js'
const memoize = require('p-memoize')
const graphql = require('graphql-client')

let options = {
  // url: 'http://192.168.178.21:3001/graphql',
  url: 'https://club-server.herokuapp.com/graphql',
  headers: {}
}
var server = graphql(options)

function query (query, variables) {
  return server
    .query(query, variables || {})
    .catch(function (e) {
      console.error(e)
      e = new Error('Bridge Club server failure')
      EventBus.$emit('error', e)
      throw e
    })
}

// Add authorization information into the request headers
EventBus.$on('authorization', function (e) {
  console.log('auth event', e)
  options.headers.Authorization = e.authorization
  server = graphql(options)
})

const plugin = {
  install (Vue, options) {
    Vue.prototype.$bridgeclub = {
      query: memoize(query),
      queryNoCache: query,
      mutate: query
    }
  }
}

export default plugin
