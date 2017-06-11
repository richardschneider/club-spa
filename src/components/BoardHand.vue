<template>
  <ol class="board-hand">
    <li><span class="spades">&spades;</span> {{ cards('S') }}</li>
    <li><span class="hearts">&hearts;</span> {{ cards('H') }}</li>
    <li><span class="diams">&diams;</span> {{ cards('D') }}</li>
    <li><span class="clubs">&clubs;</span> {{ cards('C') }}</li>
  </ol>
</template>

<style>
  .board-hand {
    padding-left: 1ex;
    list-style: none;
  }
  .spades, .hearts, .diams, .clubs {
    font-size: 120%;
    line-height: 100%;
  }
  .spades, .clubs {
    color: black;
  }
  .hearts, .diams {
    color: red;
  }
</style>

<script>

export default {
  props: ['hand'],
  data () {
    return {}
  },
  methods: {
    cards (suit) {
      return this.hand
        .cardsWithSuit(suit)
        .map(card => card.rank)
        .join('')
    }
  }
}

</script>
