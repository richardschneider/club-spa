Han<template>
  <div class="games table-responsive">
    <table class="table table-striped">
    <thead>
      <tr>
        <th>contract</th>
        <th>lead</th>
        <th>made</th>
        <th>NS <br/>score</th>
        <th>mp</th>
        <th>%</th>
        <th>EW <br/>score</th>
        <th>mp</th>
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
        </td>
        <td><card-name :card="game.lead"></card-name></td>
        <td>{{ game.made }}</td>
        <td>{{ game.NS.score }}</td>
        <td>{{ game.NS.matchpoints }}</td>
        <td>{{ game.NS.matchpointsPercentage }}</td>
        <td>{{ game.EW.score }}</td>
        <td>{{ game.EW.matchpoints }}</td>
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
  }
}

</script>
