Han<template>
  <div class="games table-responsive">
    <table class="table table-striped">
    <thead>
      <tr>
        <th>contract</th>
        <th>lead</th>
        <th>made</th>
        <th>NS <br/>score</th>
        <th>mp</th>
        <th>%</th>
        <th>EW <br/>score</th>
        <th>mp</th>
        <th>%</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="game in games">
        <td>{{ game.contract.level }} {{ game.contract.denomination }} {{ game.contract.risk }}
              <small>by</small> {{ game.contract.declaror }}
        </td>
        <td>SA</td>
        <td>{{ game.made }}</td>
        <td>{{ game.scoreNS }}</td>
        <td>23</td>
        <td>50</td>
        <td>{{ game.scoreEW }}</td>
        <td>23</td>
        <td>50</td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<style>
  .games .list-group-item {
    font-size: normal;
  }
  .games .percent {
    color: blue;
  }
</style>

<script>

export default {
  props: ['games'],
  data () {
    return {}
  }
}

</script>
