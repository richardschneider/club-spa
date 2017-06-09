<template>
  <div class="board-solution" v-if="solution">
    <table class="table">
      <thead>
        <tr>
          <th></th>
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
</style>

<script>

export default {
  props: ['board'],
  data () {
    return {
      seats: ['N', 'S', 'E', 'W'],
      strains: ['C', 'D', 'H', 'S', 'NT'],
      solution: this.board.solution
    }
  },
  created () {
    if (!this.solution) {
      this.getSolution()
    }
  },
  watch: {
    board () {
      let vm = this
      if (vm.board.solution) {
        vm.solution = vm.board.solution
      } else { vm.getSolution() }
    }
  },
  methods: {
    seatName (seat) {
      let names = { N: 'north', S: 'south', E: 'east', W: 'west' }
      return names[seat]
    },
    makable (seat, strain) {
      return 1
    },
    getSolution () {
      let vm = this
      vm.solution = null
      Promise.resolve()
        .then(() => console.log('Need a solution'))
        .then(() => {
          vm.board.solution = 'foo'
          vm.solution = 'foo'
        })
    }
  }
}

</script>
