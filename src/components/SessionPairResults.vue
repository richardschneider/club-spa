<template>
  <div class="session-pair-results">
    <h3>{{ pair.title }}</h3>
    <h4 v-if="pair.session">
      <router-link :to="{ name: 'session-results', params: { id: pair.session.id }}">
        {{ pair.session.title }}
    </router-link>
    <small>{{ pair.session.date }}</small>
    </h4>
    <games v-if="pair.games" :games="pair.games"></games>
  </div>
</template>

<style>
</style>

<script>
import Games from '@/components/Games'

const query = `
query sessionPair($id: ID!) {
  sessionPair(id: $id) {
    title
    session { id title date }
    games {
      lead
      NS { pair { id shortTitle } matchpointsPercentage }
      EW { pair { id shortTitle } matchpointsPercentage }
      made
      contract {
        level
        declaror
        denomination
        risk
      }
    }
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
    Games
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
