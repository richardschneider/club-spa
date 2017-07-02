<template>
  <div v-if="club">
    <div class="row">
      <div class="col-sm-4">
        <gmap-map
          :center="geo"
          :zoom="15"
          map-type-id="roadmap"
          style="width: 100%; height: 240px;">
            <gmap-marker
              :clickable="true"
              @click="directions"
              title="get directions"
              :position="geo">
            </gmap-marker>
        </gmap-map>
      </div>
      <div class="col-sm-8">
        <contact :contact="contact"></contact>
        <br/>
        <ul class="list-inline">
          <li>
            <a v-bind:href="vcardUrl">
              <i class="fa fa-vcard-o fa-lg"></i>
            </a>
          </li>
          <li>
            <a v-bind:href="directionsUrl">
              <i class="fa fa-car fa-lg"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
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
    },
    directionsUrl () {
      return `https://www.google.com/maps/dir/?api=1&destination=${this.club.address.lat},${this.club.address.lng}`
    },
    geo () {
      return {
        lat: this.club.address.lat,
        lng: this.club.address.lng
      }
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
    },
    directions () {
      window.location.href = this.directionsUrl
    }

  }
}
</script>
