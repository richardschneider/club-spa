<template>
  <span :class="strainClass" v-html="strain"></span>
</template>

<script>

export default {
  props: ['denomination'],
  computed: {
    strain () {
      let glyphs = { S: '&spades;', H: '&hearts;', D: '&diams;', C: '&clubs;', NT: 'NT' }
      return glyphs[this.denomination]
    },
    strainClass () {
      let className = { S: 'spades', H: 'hearts', D: 'diams', C: 'clubs', NT: 'notrumps' }
      return className[this.denomination]
    }
  }
}

</script>
