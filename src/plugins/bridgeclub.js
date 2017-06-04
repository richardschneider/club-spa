// A plugin that accesses the bridge club server.
// $bridgeclub is available to all vue instances.

var server = require('graphql-client')({
  url: 'http://localhost:3001/graphql',
  headers: { }
})

function query (query, variables) {
  return server.query(query, variables || {})
}

const plugin = {
  install (Vue, options) {
    Vue.prototype.$bridgeclub = { query: query }
  }
}

export default plugin
