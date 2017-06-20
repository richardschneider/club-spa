<template>
  <div class="session-pair-results">
    <h3>{{ pair.title }} <small>as {{ pair.direction }}</small></h3>
    <h4 v-if="pair.session">
      <router-link :to="{ name: 'session-results', params: { id: pair.session.id }}">
        {{ pair.session.title }}
      </router-link>
    <small>{{ pair.session.date }}</small>
    </h4>
    <my-games v-if="pair.games" :pair="pair"></my-games>
  </div>
</template>

<style>
</style>

<script>
import MyGames from '@/components/MyGames'

const query = `
query sessionPair($id: ID!) {
  sessionPair(id: $id) {
    title
    direction
    session { id title date }
    games {
      board { id number }
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
    MyGames
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
