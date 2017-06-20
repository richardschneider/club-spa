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
        <td>{{ us(game).matchpointsPercentage.toFixed(2) }}</td>
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
    made (game) {
      if (game.made < 0) return game.made
      let result = game.made - game.contract.level
      if (result === 0) return '='
      return '+' + result
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
