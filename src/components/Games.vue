<template>
  <div class="games table-responsive">
    <table class="table table-striped">
    <thead>
      <tr>
        <th>contract</th>
        <th>lead</th>
        <th>NS</th>
        <th>%</th>
        <th>EW</th>
        <th>%</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="game in orderedGames" v-bind:class="{ 'my-game': isMyGame(game) }">
        <td>
          <game-contract :game="game"></game-contract>
        </td>
        <td><card-name :card="game.lead"></card-name></td>
        <td>
          <router-link :to="{ name: 'session-pair-results', params: { id: game.NS.pair.id }}">
            {{ game.NS.pair.shortTitle }}
          </router-link>
        </td>
        <td>
          <percent :value="game.NS.matchpointsPercentage"></percent>
        </td>
        <td>
          <router-link :to="{ name: 'session-pair-results', params: { id: game.EW.pair.id }}">
            {{ game.EW.pair.shortTitle }}
          </router-link>
        </td>
        <td>
          <percent :value="game.EW.matchpointsPercentage"></percent>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<style>
  .my-game {
    font-weight: bold;
  }
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
  props: ['games', 'myPairId'],
  components: {
    cardName,
    GameContract,
    percent
  },
  computed: {
    orderedGames () {
      return this.games.slice().sort((a, b) => b.NS.matchpointsPercentage - a.NS.matchpointsPercentage)
    }
  },
  methods: {
    isMyGame (game) {
      return game.NS.pair.id === this.myPairId || game.EW.pair.id === this.myPairId
    }
  }
}

</script>
