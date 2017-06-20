<template>
  <span v-if="value !== null">{{rounded}}</span>
</template>

<script>
function round (number, precision) {
  let factor = Math.pow(10, precision)
  let tempNumber = number * factor
  let roundedTempNumber = Math.round(tempNumber)
  return roundedTempNumber / factor
}

export default {
  props: ['value'],
  computed: {
    rounded () {
      return round(this.value, 2)
    }
  }
}
</script>
