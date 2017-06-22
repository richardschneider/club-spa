<template>
  <div class="board" v-if="board.session">
    <h3>
      <router-link :to="{ name: 'session-results', params: { id: board.session.id }}">
        {{ board.session.title }}
      </router-link>
      <small>{{ board.session.date }}</small>
    </h3>
    <board :board="board"></board>
    <games :games="board.games"></games>
  </div>
</template>

<script>
import Board from '@/components/Board'
import Games from '@/components/Games'

const query = `
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
    this.fetch(this.$route.params.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.fetch(to.params.id)
    next()
  },
  data () {
    return {
      board: {}
    }
  },
  components: {
    Board,
    Games
  },
  methods: {
    fetch (boardId) {
      let vm = this
      vm.$bridgeclub.query(query, { id: boardId })
        .then(body => {
          vm.board = body.data.board
        })
    }
  }
}
</script>
