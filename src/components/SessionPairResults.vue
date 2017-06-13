<template>
  <div class="session-pair-results">
    <h3>{{ pair.title }}</h3>
  </div>
</template>

<style>
</style>

<script>

const query = `
query sessionPair($id: ID!) {
  sessionPair(id: $id) {
    title
}
}`

export default {
  created () {
    this.fetch(this.$route.params.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.fetch(to.params.id)
    next()
  },
  data () {
    return {
      pair: {}
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
    fetch (pairId) {
      let vm = this
      vm.$bridgeclub.query(query, { id: pairId })
        .then(body => {
          vm.pair = body.data.sessionPair
        })
    }
  }
}
</script>
