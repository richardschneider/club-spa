<template>
  <div class="session" v-if="session.id">
    <h3>{{ session.title}} <small>{{ session.date }}</small></h3>

    <ul class="nav nav-tabs">
      <li v-bind:class="{ active: isActive('results') }">
        <router-link to="results">results</router-link>
      </li>
      <li v-bind:class="{ active: isActive('boards') }">
        <router-link :to="{ name: 'boards', params: { number: boardNumber }}">boards</router-link>
      </li>
      <li v-bind:class="{ active: isActive('ladder') }">
        <router-link to="ladder">ladder</router-link>
      </li>
    </ul>

    <router-view style="margin: 15px 0"></router-view>
  </div>
</template>

<script>

const query = `
query session($id: ID!) {
  session(id: $id) {
      id
      title
      date
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
    return {
      session: {},
      boardNumber: 1
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
    isActive (name) {
      return this.$route.path.includes(`/${name}`)
    },
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

