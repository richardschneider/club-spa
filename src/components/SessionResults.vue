<template>
  <div class="session-results">
    <h3>{{ session.title}} <small>{{ session.date }}</small></h3>
    <session-results-pairs direction="NS" :pairs="session.pairs"></session-results-pairs>
    <session-results-pairs direction="EW" :pairs="session.pairs"></session-results-pairs>
  </div>
</template>

<script>
import SessionResultsPairs from '@/components/SessionResultsPairs'

const query = `
query session($id: ID!) {
  session(id: $id) {
      title
      date
      pairs {
        title
        direction
      }
    }
}`

export default {
  created () {
    this.fetch(this.$route.params.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.fetch(to.params.id)
    next()
  },
  data () {
    return { session: {} }
  },
  components: {
    SessionResultsPairs
  },
  methods: {
    fetch (sessionID) {
      let vm = this
      vm.$bridgeclub.query(query, { id: sessionID })
        .then(body => {
          vm.session = body.data.session
        })
    }
  }
}
</script>

