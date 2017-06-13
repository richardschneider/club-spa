<template>
  <ol class="board-hand">
    <li><span class="spades">&spades;</span> <span class="cards">{{ cards('S') }}</span></li>
    <li><span class="hearts">&hearts;</span> <span class="cards">{{ cards('H') }}</span></li>
    <li><span class="diams">&diams;</span> <span class="cards">{{ cards('D') }}</span></li>
    <li><span class="clubs">&clubs;</span> <span class="cards">{{ cards('C') }}</span></li>
  </ol>
</template>

<style>
  .board-hand {
    padding-left: 1ex;
    list-style: none;
    font-family: monospace;
  }
  .board-hand .cards {
    letter-spacing  : 1.5px;
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
