<template>
  <form class="club-form" v-if="club.id">
    <div class="form-group">
      <label for="name">name</label>
      <input v-model="club.name" name="name" type="text" class="form-control" >
    </div>
    <div class="form-group">
      <label for="email">email</label>
      <input v-model="club.email" name="email" type="email" class="form-control" >
    </div>
    <div class="form-group">
      <label for="name">address</label>
      <places
        v-model="club.address"
        @change="val => setAddress(val)"
        class="form-control"
        :options="{ useDeviceLocation: true }">
    </places>
  </div>
  </form>
</template>

<script>
import Places from 'vue-places'

const query = `
query club($id: ID!) {
  club(id: $id) {
    id
    name
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
      club: {}
    }
  },
  computed: {
  },
  components: {
    Places
  },
  methods: {
    fetch (clubId) {
      let vm = this
      vm.$bridgeclub.query(query, { id: clubId })
        .then(body => {
          vm.club = body.data.club
        })
    },
    setAddress (data) {
      console.log('addr', data)
    }
  }
}
</script>
