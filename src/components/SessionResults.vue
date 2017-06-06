<template>
  <div class="session-results">
    <h3>{{ session.title}} <small>{{ session.date }}</small></h3>

    <tabs>
      <tab header="results">
        <session-results-pairs direction="NS" :pairs="session.pairs"></session-results-pairs>
        <session-results-pairs direction="EW" :pairs="session.pairs"></session-results-pairs>
      </tab>
      <tab header="boards" v-show="session.boards">
        <board :board="board"></board>
        <games :games="board.games"></games>
      </tab>
      <tab header="ladder">
        NYI ladder
      </tab>
    </tabs>
  </div>
</template>

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
        number
        dealer
        vulnerability
        deal
        games {
          score
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
      return vm.session.boards.find(b => b.number === vm.boardNumber)
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
    }
  }
}
</script>

