<template>
  <div class="board-solutions" v-if="solutions">
    <table class="solutions">
      <thead>
        <tr>
          <th style="width: 2em"></th>
          <th class="clubs">&clubs;</th>
          <th class="diams">&diams;</th>
          <th class="hearts">&hearts;</th>
          <th class="spades">&spades;</th>
          <th class="nt">NT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="seat in seats">
          <td>{{ seatName(seat) }}</td>
          <td v-for="strain in strains">
            {{ makable(seat, strain) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
  table.solutions td, table.solutions th {
    min-width: 1.1em;
    line-height: 120%;
    text-align: center;
  }
  table.solutions tbody {
    font-size: small;
  }
</style>

<script>
const query = `
query board($id: ID!) {
  board(id: $id) {
    solutions {
      level
      declaror
      denomination
    }
  }
}`

export default {
  props: ['board'],
  data () {
    return {
      seats: ['N', 'S', 'E', 'W'],
      strains: ['C', 'D', 'H', 'S', 'NT'],
      solutions: null
    }
  },
  created () {
    if (!this.solutions) {
      this.getSolutions()
    }
  },
  watch: {
    board () {
      let vm = this
      if (vm.board.solutions) {
        vm.solutions = vm.board.solutions
      } else { vm.getSolutions() }
    }
  },
  methods: {
    seatName (seat) {
      // let names = { N: 'north', S: 'south', E: 'east', W: 'west' }
      // return names[seat]
      return seat
    },
    makable (seat, strain) {
      let solution = this.solutions.find(s => s.declaror === seat && s.denomination === strain)
      return solution ? solution.level : ''
    },
    getSolutions () {
      let vm = this
      vm.solutions = null
      vm.$bridgeclub
        .query(query, { id: vm.board.id })
        .then(body => {
          vm.board.solutions = body.data.board.solutions
          vm.solutions = body.data.board.solutions
        })
    }
  }
}

</script>
