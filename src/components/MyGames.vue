<template>
  <div class="games table-responsive">
    <table class="table table-striped">
    <thead>
      <tr>
        <th>
          <span class="visible-xs-inline">#</span>
          <span class="hidden-xs">board</span>
        </th>
        <th>contract</th>
        <th>lead</th>
        <th>%</th>
        <th>opponent</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="game in orderdGames">
        <td>
          <router-link :to="{ name: 'board', params: { id: pair.session.id, number: game.board.number }}">
            {{ game.board.number }}
          </router-link>
        </td>
        <td>
          <game-contract :game="game"></game-contract>
        </td>
        <td><card-name :card="game.lead"></card-name></td>
        <td>
          <percent :value="us(game).matchpointsPercentage"></percent>
        </td>
        <td>
          <router-link :to="{ name: 'session-pair-results', params: { id: them(game).pair.id }}">
            {{ them(game).pair.shortTitle }}
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<style>
  .games .list-group-item {
    font-size: normal;
  }
  .games .percent {
    color: blue;
  }
</style>

<script>
import cardName from '@/components/CardName'
import GameContract from '@/components/GameContract'
import percent from '@/components/percent'

export default {
  props: ['pair'],
  components: {
    cardName,
    GameContract,
    percent
  },
  computed: {
    orderdGames () {
      return this.pair.games.slice().sort((a, b) => this.us(b).matchpointsPercentage - this.us(a).matchpointsPercentage)
    }
  },
  methods: {
    us (game) {
      return game[this.pair.direction]
    },
    them (game) {
      let direction = this.pair.direction === 'NS' ? 'EW' : 'NS'
      return game[direction]
    }
  }
}

</script>
