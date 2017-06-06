<template>
  <div class="games">
    <ul class="list-group">
      <slot name="games"
        v-for="game in games"
        :game="game">
        <li class="list-group-item">
          {{ game.contract.level }} {{ game.contract.denomination }} {{ game.contract.risk }}
          <small>by</small> {{ game.contract.declaror }}
          <small>made</small> {{ game.made }}
        </li>
      </slot>
    </ul>
  </div>
</template>

<script>

export default {
  props: ['games'],
  data () {
    return {}
  }
}

</script>
