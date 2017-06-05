// A plugin that accesses the bridge club server.
// $bridgeclub is available to all vue instances.

import { EventBus } from '@/eventbus.js'

var server = require('graphql-client')({
  url: 'http://192.168.178.21:3001/graphql',
  headers: { }
})

function query (query, variables) {
  return server
    .query(query, variables || {})
    .catch(function () {
      let e = new Error('Bridge Club server failure')
      EventBus.$emit('error', e)
      throw e
    })
}

const plugin = {
  install (Vue, options) {
    Vue.prototype.$bridgeclub = { query: query }
  }
}

export default plugin
