<template>
  <form class="club-form" v-if="club">
    <div class="form-group">
      <label for="name">name</label>
      <input v-model="club.name" id="name" type="text" class="form-control" >
    </div>
    <div class="form-group">
      <label for="email">email</label>
      <input v-model="club.email" id="email" type="email" class="form-control" >
    </div>
    <div class="form-group">
      <label for="phone">phone</label>
      <input v-model="club.phone" id="phone" type="phone" class="form-control" >
    </div>
    <div class="form-group">
      <label for="address">address</label>
      <places
        id="address"
        v-model="addressTitle"
        @change="val => setAddress(val)"
        class="form-control"
        :options="{ useDeviceLocation: true }">
      </places>
    </div>
    <div class="form-group">
      <button v-on:click.stop="save()" type="button" class="btn btn-primary">Save</button>
      <button v-on:click.stop="fetch()" type="button" class="btn btn-default">Revert</button>
    </div>
  </form>
</template>

<script>
import Places from 'vue-places'

const query = `
query club($id: ID!) {
  club(id: $id) {
    name
    email
    phone
    address {
      name
      city
      administrative
      country
      countryCode
      lat
      lng
      postcode
      title
    }
  }
}`

const mutate = `
mutation club($id: ID!, $input: ClubInput) {
  updateClub(id: $id, input: $input) { id }
}
`

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
      club: null,
      clubId: null,
      addressTitle: ''
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
      vm.clubId = clubId || vm.clubId
      vm.$bridgeclub.queryNoCache(query, { id: vm.clubId })
        .then(body => {
          vm.club = body.data.club
          vm.addressTitle = vm.club.address ? vm.club.address.title : ''
        })
    },
    save () {
      let vm = this
      vm.$bridgeclub
        .mutate(mutate, { id: vm.clubId, input: vm.club })
    },
    setAddress (data) {
      let latlng = data.latlng || {}
      this.club.address = {
        name: data.name || '',
        city: data.city || '',
        administrative: data.administrative || '',
        country: data.country || '',
        countryCode: data.countryCode || '',
        lat: latlng.lat || null,
        lng: latlng.lng || null,
        postcode: data.postcode || '',
        title: data.value || ''
      }
    }
  }
}
</script>
