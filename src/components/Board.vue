<template>
  <div class="board">
    Board {{ board.number }}
    <br/>
    {{ board.deal }}
  </div>
</template>

<script>

export default {
  props: ['board'],
  data () {
    return {}
  }
}

</script>
