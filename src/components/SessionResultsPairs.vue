<template>
  <div class="session-results-pairs">
    <h3>{{ title }}</h3>
    <ol v-for="pair in rankedPairs" class="list-group">
      <li class="list-group-item">
        <span class="rank">1</span>
        <span class="badge">50%</span>
        <span>{{ pair.title }}</span>
      </li>
    </ol>
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
    }
  },
  methods: {
  }
}

</script>
