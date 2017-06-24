<template>
  <div class="game-play">
    <table class="game-play">
      <thead>
        <tr>
          <th v-for="seat in seats">{{ seat.symbol }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trick in tricks">
          <td v-for="seat in seats">
            <card-name :card="trick.card(seat)" v-bind:class="cardClasses(trick, seat)"></card-name>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="tricks.length !== 13" class="text-warning">
      <em>remaining tricks not available</em>
    </p>
  </div>
</template>

<script>
import CardName from '@/components/CardName'
import bridge from 'bridge.js'

export default {
  props: ['game'],
  components: {
    CardName
  },
  computed: {
    declaror () {
      return bridge.seat[this.game.contract.declaror]
    },
    opener () {
      return this.declaror.next
    },
    seats () {
      let seat = this.opener
      let seats = []
      for (let i = 0; i < 4; ++i) {
        seats.push(seat)
        seat = seat.next
      }
      return seats
    },
    model () {
      let game = new bridge.Game()
      game.contract.level = this.game.contract.level
      game.contract.denomination = this.game.contract.denomination
      game.contract.risk = this.game.contract.risk
      game.contract.declaror = this.declaror
      game.play(this.game.play.split(' '))
      return game
    },
    tricks () {
      return this.model.tricks
    }
  },
  methods: {
    cardClasses (trick, seat) {
      return {
        leader: trick.leader() === seat,
        winner: trick.winner(this.model.contract) === seat
      }
    }
  }
}
</script>

<style>
  .game-play table, .game-play td, .game-play th {
    border-collapse: separate
  }
  .game-play table {
    border-spacing: 0 4px;
  }
  .game-play th {
    min-width: 3.3em;
    font-size: 90%;
  }
  .game-play thead {
    border-bottom: 1px solid silver;
  }
  .game-play tbody tr {
    margin-top: 2px;
  }
  .game-play .leader {
    text-decoration: underline;
  }
  .game-play .winner {
    background-color: #EBFFD6;
    border: 1px solid lime;
    border-radius: 4px;
    padding: 2px;
  }

</style>
