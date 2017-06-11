<template>
  <div class="session-results">
    <h3>{{ session.title}} <small>{{ session.date }}</small></h3>

    <tabs>
      <tab header="results">
        <session-results-pairs direction="NS" :pairs="session.pairs"></session-results-pairs>
        <session-results-pairs direction="EW" :pairs="session.pairs"></session-results-pairs>
      </tab>
      <tab header="boards">
        <div header="boards" v-if="session.boards">
          <v-touch v-on:swiperight="nextBoard(1)" v-on:swipeleft="nextBoard(-1)">
            <board :board="board"></board>
          </v-touch>
          <games :games="board.games"></games>
            <ul class="pager">
              <li><a v-on:click="nextBoard(-1)"><i class="fa fa-angle-left" aria-hidden="true"></i> previous</a></li>
              <li><a v-on:click="nextBoard(1)">next <i class="fa fa-angle-right" aria-hidden="true"></i></a></li>
            </ul>
        </div>
      </tab>
      <tab header="ladder">
        NYI ladder
      </tab>
    </tabs>
  </div>
</template>

<style>
  .pager {
    cursor: pointer;
  }
</style>

<script>
import { tabs, tab } from 'vue-strap'
import SessionResultsPairs from '@/components/SessionResultsPairs'
import Board from '@/components/Board'
import Games from '@/components/Games'

const query = `
query session($id: ID!) {
  session(id: $id) {
      title
      date
      pairs {
        title
        direction
      }
      boards {
        id
        number
        dealer
        vulnerability
        deal
        games {
          lead
          NS { score matchpoints matchpointsPercentage }
          EW { score matchpoints matchpointsPercentage }
          made
          contract {
            level
            declaror
            denomination
            risk
          }
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
      session: {},
      boardNumber: 1
    }
  },
  computed: {
    board () {
      let vm = this
      if (vm.session.boards) {
        return vm.session.boards.find(b => b.number === vm.boardNumber)
      }
    }
  },
  components: {
    SessionResultsPairs,
    tabs,
    tab,
    Board,
    Games
  },
  methods: {
    fetch (sessionID) {
      let vm = this
      vm.$bridgeclub.query(query, { id: sessionID })
        .then(body => {
          vm.session = body.data.session
        })
    },
    nextBoard (incr) {
      let n = this.boardNumber + incr
      if (n < 1) n = this.session.boards.length
      if (n > this.session.boards.length) n = 1
      this.boardNumber = n
    }
  }
}
</script>

