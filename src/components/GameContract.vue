<template>
  <span class="game-contract">
    <router-link :to="{ name: 'game', params: { id: game.id }}">
      <span v-if="game.contract.level === 0">
        passed
      </span>
      <span v-else>
        {{ game.contract.level }}
        <denomination-name :denomination="game.contract.denomination"></denomination-name>
        <span class="risk">{{ game.contract.risk }}</span>
        <small>by</small>
        {{ game.contract.declaror }}
        {{ made }}
      </span>
    </router-link>
  </span>
</template>

<script>
import DenominationName from '@/components/DenominationName'

export default {
  props: ['game'],
  components: {
    DenominationName
  },
  computed: {
    made () {
      if (this.game.made < 0) return this.game.made
      let result = this.game.made - this.game.contract.level
      if (result === 0) return '='
      return '+' + result
    }
  }
}
</script>

<style>
  .game-contract a,
  .game-contract a:link,
  .game-contract a:active,
  .game-contract a:visited,
  .game-contract a:hover {
    color: inherit;
    text-decoration: none;
  }
  .game-contract a:hover {
    text-decoration: underline;
  }
</style>
