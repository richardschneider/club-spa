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
      <tr v-for="game in games">
        <td v-if="game.contract.level === 0">
          passed
        </td>
        <td v-else>
          {{ game.contract.level }}
          <denomination-name :denomination="game.contract.denomination"></denomination-name>
          <span class="risk">{{ game.contract.risk }}</span>
          <small>by</small>
          {{ game.contract.declaror }}
          {{ made(game) }}
        </td>
        <td><card-name :card="game.lead"></card-name></td>
        <td>
          <router-link :to="{ name: 'session-pair-results', params: { id: game.NS.pair.id }}">
            {{ game.NS.pair.shortTitle }}
          </router-link>
        </td>
        <td>{{ game.NS.matchpointsPercentage.toFixed(2) }}</td>
        <td>
          <router-link :to="{ name: 'session-pair-results', params: { id: game.EW.pair.id }}">
            {{ game.EW.pair.shortTitle }}
          </router-link>
        </td>
        <td>{{ game.EW.matchpointsPercentage.toFixed(2) }}</td>
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
import denominationName from '@/components/DenominationName'

export default {
  props: ['games'],
  components: {
    cardName,
    denominationName
  },
  methods: {
    made (game) {
      if (game.made < 0) return game.made
      let result = game.made - game.contract.level
      if (result === 0) return '='
      return '+' + result
    }
  }
}

</script>
