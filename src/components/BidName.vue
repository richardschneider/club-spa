<template>
  <span class="bid" v-if="bid">
    <span class="pass" v-if="bid.isPass">-</span>
    <span class="double" v-if="bid.isDouble">X</span>
    <span class="redouble" v-if="bid.isRedouble">XX</span>
    <span class="level" v-if="bid.level">
      {{ bid.level }}<denomination-name :denomination="bid.denomination"></denomination-name>
    </span>
  </span>
</template>

<script>
import DenominationName from '@/components/DenominationName'

export default {
  props: ['bid'],
  components: {
    DenominationName
  }
}

</script>

<style>
  .bid>.double, .bid>.redouble {
    font-weight: bold;
  }
</style>
