<template>
  <div class="board-hcp">
    <div>{{ hands.north.hcp() }}</div>
    <div>{{ hands.west.hcp() }}&nbsp;&nbsp;&nbsp;&nbsp;{{ hands.east.hcp() }}</div>
    <div>{{ hands.south.hcp() }}</div>
  </div>
</template>

<style>
</style>

<script>

export default {
  props: ['hands']
}

</script>
