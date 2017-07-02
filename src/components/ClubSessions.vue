<template>
  <div class="sessions">
    <vue-event-calendar
      :events="sessions"
      @month-changed="fetch()">
      <template scope="props">
      <search :items="props.showEvents">
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
      </template>
    </vue-event-calendar>
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
      clubId = clubId || vm.clubId
      vm.clubId = clubId
      vm.$bridgeclub.query(query, { id: clubId })
        .then(body => {
          let sessions = body.data.club.sessions
            .map(s => {
              let p = s.date.split('-')
              let copy = Object.assign({}, s)
              copy.date = `${p[0]}/${p[1]}/${p[2]}` // Y/M/D
              return copy
            })
          vm.sessions = sessions
          vm.clubName = body.data.club.name
        })
    }
  }
}
</script>

