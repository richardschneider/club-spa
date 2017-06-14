<template>
  <div class="games table-responsive">
    <table class="table table-striped">
    <thead>
      <tr>
        <th>board</th>
        <th>contract</th>
        <th>lead</th>
        <th>%</th>
        <th>opponent</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="game in pair.games">
        <td>{{ game.board.number }}</td>
        <td>
          {{ game.contract.level }}
          <denomination-name :denomination="game.contract.denomination"></denomination-name>
          <span class="risk">{{ game.contract.risk }}</span>
          <small>by</small>
          {{ game.contract.declaror }}
          {{ made(game.made) }}
        </td>
        <td><card-name :card="game.lead"></card-name></td>
        <td>{{ us(game).matchpointsPercentage }}</td>
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
  .games .risk {
    font-weight: bold;
  }
</style>

<script>
import cardName from '@/components/CardName'
import denominationName from '@/components/DenominationName'

export default {
  props: ['pair'],
  components: {
    cardName,
    denominationName
  },
  methods: {
    made (result) {
      if (result === 0) return '='
      if (result > 0) return '+' + result
      return result
    },
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
