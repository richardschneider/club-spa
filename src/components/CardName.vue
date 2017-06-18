<template>
  <span class="card-name" v-if="card">
    <span :class="suitClass" v-html="suit"></span><span class="suitRank">{{ rank }}</span>
  </span>
</template>

<script>
import { card } from 'bridge.js'

export default {
  props: ['card'],
  computed: {
    suit () {
      let glyphs = { S: '&spades;', H: '&hearts;', D: '&diams;', C: '&clubs;' }
      return glyphs[card[this.card].suit]
    },
    suitClass () {
      let className = { S: 'spades', H: 'hearts', D: 'diams', C: 'clubs' }
      return className[card[this.card].suit]
    },
    rank () {
      return card[this.card].rank
    }
  }
}

</script>
