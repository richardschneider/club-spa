<template>
  <div class="session-results-pairs">
    <h4>{{ title }}</h4>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <td>rank</td>
            <td>pair</td>
            <td>%</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pair in rankedPairs">
            <td>{{ pair.ranking.rank}} </td>
            <td>
              <router-link :to="{ name: 'session-pair-results', params: { id: pair.id }}">
                {{ pair.title }}
              </router-link>
            </td>
            <td>{{ pair.ranking.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    direction: String,
    pairs: Array
  },
  data () {
    return {
    }
  },
  computed: {
    title () { return this.direction === 'NS' ? 'North / South' : 'East / West' },
    rankedPairs () {
      let vm = this
      return (vm.pairs || [])
        .filter(p => p.direction === vm.direction)
        .sort((a, b) => a.ranking.rank - b.ranking.rank)
    }
  },
  methods: {
  }
}

</script>
