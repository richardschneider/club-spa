<template>
  <div class="game" v-if="game.id">
    <h4>
      <router-link :to="{ name: 'session-results', params: { id: game.session.id }}">
        {{ game.session.title }}
      </router-link>
      <small>{{ game.session.date }}</small>
    </h4>
    <h5>
      <router-link :to="{ name: 'session-pair-results', params: { id: game.NS.pair.id }}">
        {{ game.NS.pair.title }} <small>as NS</small>
      </router-link>
    </h5>
    <h5>
      <router-link :to="{ name: 'session-pair-results', params: { id: game.EW.pair.id }}">
        {{ game.EW.pair.title }} <small>as EW</small>
      </router-link>
    </h5>
    <div class="row">
      <div class="col-sm-6">
        <board :board="game.board"></board>
      </div>
      <div class="col-sm-6">
        <div class="panel panel-default">
          <div class="panel-heading">Contract</div>
          <div class="panel-body">
            <game-contract :game="game"></game-contract>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="panel-heading">Auction</div>
          <div class="panel-body">
            NYI
          </div>
        </div>
        <div class="panel panel-default">
          <div class="panel-heading">Play</div>
          <div class="panel-body">
            NYI
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Board from '@/components/Board'
import Games from '@/components/Games'
import GameContract from '@/components/GameContract'

const query = `
query game($id: ID!) {
  game (id: $id) {
    id
    auction
    lead
    NS { pair { id title } }
    EW { pair { id title } }
    made
    contract {
      level
      declaror
      denomination
      risk
    }
    session {
      id
      title
      date
    }
    NS {
      pair {
        title
      }
    }
    EW {
      pair {
        title
      }
    }
    board {
      id
      number
      dealer
      vulnerability
      deal
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
      game: {}
    }
  },
  components: {
    Board,
    Games,
    GameContract
  },
  methods: {
    fetch (gameId) {
      let vm = this
      vm.$bridgeclub.query(query, { id: gameId })
        .then(body => {
          vm.game = body.data.game
        })
    }
  }
}
</script>
