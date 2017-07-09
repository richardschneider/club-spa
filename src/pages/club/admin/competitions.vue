<template>
  <div>
    <search :items="competitions">
      <template slot="results" scope="props">
        <li class="list-group-item">
          <router-link :to="{ name: 'club-admin-competition', params: { cid: props.item.id }}">
            <highlight :text="props.item.name" :phrase="props.filter"></highlight>
          </router-link>
        </li>
      </template>
    </search>

    <router-link to="competition">Add competition</router-link>
  </div>
</template>

<script>
import search from '@/components/Search'
import highlight from '@/components/Highlight'

const query = `
query club($id: ID!) {
  club(id: $id) {
    competitions {id name type}
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
    return { competitions: [] }
  },
  components: {
    search,
    highlight
  },
  methods: {
    fetch (clubId) {
      let vm = this
      vm.$bridgeclub.queryNoCache(query, { id: clubId })
        .then(body => {
          vm.competitions = body.data.club.competitions
        })
    }
  }
}
</script>
