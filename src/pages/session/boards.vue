<template>
  <div v-if="board.id">
    <v-touch v-on:swiperight="nextBoard(-1)" v-on:swipeleft="nextBoard(1)">
      <board :board="board"></board>
    </v-touch>
    <games :games="board.games"></games>
      <ul class="pager" v-if="session.boards.length > 1">
        <li>
          <router-link :to="{ name: 'boards', params: { number: nextBoardNumber(-1) }}">
            <i class="fa fa-angle-left" aria-hidden="true"></i> previous
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'boards', params: { number: nextBoardNumber(1) }}">
            next <i class="fa fa-angle-right" aria-hidden="true"></i>
          </router-link>
        </li>
      </ul>
  </div>
</template>

<script>
import Board from '@/components/Board'
import Games from '@/components/Games'

const query = `
query session($id: ID!) {
  session(id: $id) {
    boards {
      id
      number
    }
  }
}`

const queryBoard = `
query board($id: ID!) {
  board (id: $id) {
    id
    number
    dealer
    vulnerability
    deal
    session {
      id
      title
      date
    }
    games {
      id
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
    this.boardNumber = parseInt(this.$route.params.number, 10)
    this.fetch(this.$route.params.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.boardNumber = parseInt(to.params.number, 10)
    this.fetch(to.params.id)
    next()
  },
  data () {
    return {
      session: {},
      board: {}
    }
  },
  computed: {
  },
  components: {
    Board,
    Games
  },
  methods: {
    fetch (sessionID) {
      let vm = this
      vm.$bridgeclub.query(query, { id: sessionID })
        .then(body => {
          vm.session = body.data.session
          vm.session.boards.sort((a, b) => a.number - b.number)
        })
        .then(() => vm.fetchBoard())
    },
    fetchBoard () {
      let vm = this
      let board = vm.session.boards.find(board => board.number === vm.boardNumber)
      vm.$bridgeclub.query(queryBoard, { id: board.id })
        .then(body => {
          vm.board = body.data.board
          window.scrollTo(0, 0)
        })
    },
    nextBoardNumber (incr) {
      let n = this.session.boards.findIndex(b => b.number === this.board.number) + incr
      if (n < 0) n = this.session.boards.length - 1
      n = n % this.session.boards.length
      return this.session.boards[n].number
    }
  }
}
</script>

<style>
  .pager {
    cursor: pointer;
  }
</style>

