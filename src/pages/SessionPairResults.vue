<template>
  <div class="session-pair-results">
    <h3>{{ pair.title }} <small>as {{ pair.direction }}</small></h3>
    <h4 v-if="pair.session">
      <router-link :to="{ name: 'session-results', params: { id: pair.session.id }}">
        {{ pair.session.title }}
      </router-link>
    <small>{{ pair.session.date }}</small>
    </h4>
    <p v-if="pair.ranking && pair.ranking.rank !== 0"><star-rating
        :inline="true"
        inactive-color="white"
        :item-size="20"
        :read-only="true"
        :rating="stars"
        :show-rating="false"
        :increment="0.01">
      </star-rating>
      <br />
      Ranking
      {{ pair.ranking.rank }}
      with <percent :value="pair.ranking.score"></percent>%
    </p>
    <my-games v-if="pair.games" :pair="pair"></my-games>
  </div>
</template>

<style>
  .rating-container.inline {
    margin-left: 0;
  }
</style>

<script>
import MyGames from '@/components/MyGames'
import percent from '@/components/percent'
import {StarRating} from 'vue-rate-it'

const query = `
query sessionPair($id: ID!) {
  sessionPair(id: $id) {
    title
    direction
    session { id title date }
    ranking {
      rank
      tied
      score
      scale
    }
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
    stars () {
      return this.pair.ranking.scale * 5
    }
  },
  components: {
    MyGames,
    percent,
    StarRating
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
