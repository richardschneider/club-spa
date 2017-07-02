<template>
  <div v-if="club">
    <contact :contact="contact"></contact>
    <a v-bind:href="vcardUrl">
      <i class="fa fa-vcard-o" style="font-size:34px"></i>
    </a>
  </div>
</template>

<script>
import Contact from '@/components/Contact'

const query = `
query club($id: ID!) {
  club(id: $id) {
    id
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
      club: null
    }
  },
  computed: {
    contact () {
      return {
        name: this.club.name,
        address: this.club.address,
        phone: this.club.phone,
        email: this.club.email
      }
    },
    vcardUrl () {
      return `https://club-server.herokuapp.com/club/${this.club.id}/vcard`
    }
  },
  components: {
    Contact
  },
  methods: {
    fetch (clubId) {
      let vm = this
      vm.clubId = clubId || vm.clubId
      vm.$bridgeclub.query(query, { id: vm.clubId })
        .then(body => {
          vm.club = body.data.club
        })
    }
  }
}
</script>
