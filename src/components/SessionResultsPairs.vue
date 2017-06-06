<template>
  <h3>{{ title }}</h3>
</template>

<script>
export default {
  props: {
    direction: String
  },
  data () {
    return {
    }
  },
  computed: {
    title () { return this.direction === 'NS' ? 'North / South' : 'East / West' }
  },
  methods: {
  }
}

</script>
