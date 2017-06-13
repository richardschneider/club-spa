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
        <td>
          {{ game.contract.level }}
          <denomination-name :denomination="game.contract.denomination"></denomination-name>
          {{ game.contract.risk }}
          <small>by</small>
          {{ game.contract.declaror }}
          {{ made(game.made) }}
        </td>
        <td><card-name :card="game.lead"></card-name></td>
        <td>
          <router-link :to="{ name: 'session-pair-results', params: { id: game.NS.pair.id }}">
            {{ game.NS.pair.shortTitle }}
          </router-link>
        </td>
        <td>{{ game.NS.matchpointsPercentage }}</td>
        <td>
          <router-link :to="{ name: 'session-pair-results', params: { id: game.EW.pair.id }}">
            {{ game.EW.pair.shortTitle }}
          </router-link>
        </td>
        <td>{{ game.EW.matchpointsPercentage }}</td>
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
    made (result) {
      if (result === 0) return '='
      if (result > 0) return '+' + result
      return result
    }
  }
}

</script>
