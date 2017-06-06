<template>
  <div class="sessions">
    <h1>{{ clubName }}</h1>
    <search :items="sessions">
      <template slot="results" scope="props">
        <li class="list-group-item">
          <router-link :to="{ name: 'session-results', params: { id: props.item.id }}">
            <highlight :text="props.item.title" :phrase="props.filter"></highlight>
            <small>
              <highlight :text="props.item.date" :phrase="props.filter"></highlight>
            </small>
          </router-link>
        </li>
      </template>
    </search>
  </div>
</template>

<script>
import search from '@/components/Search'
import highlight from '@/components/Highlight'

const query = `
query club($id: ID!) {
  club(id: $id) {
    name
    sessions {id title date}
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
  components: {
    search,
    highlight
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

