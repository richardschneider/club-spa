<template>
  <div class="sessions">
    <h1>Sessions for club {{ clubName }}</h1>
    <ul class="clubs">
       <li v-for="session in sessions">
         {{ session.title }}
         <!--router-link :to="{ name: 'session-result', params: { id: session.id }}">{{ session.title }}</router-link-->
       </li>
    </ul>
  </div>
</template>

<script>

const query = `
query club($id: ID!) {
  club(id: $id) {
    name
    sessions {id title}
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
    return { clubName: '', sessions: [] }
  },
  methods: {
    fetch (clubId) {
      let vm = this
      vm.$bridgeclub.query(query, { id: clubId })
        .then(body => {
          vm.sessions = body.data.club.sessions
          vm.clubName = body.data.club.name
        })
    }
  }
}
</script>

