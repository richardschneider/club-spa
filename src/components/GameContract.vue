<template>
  <span class="game-contract">
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
