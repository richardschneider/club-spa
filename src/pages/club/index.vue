<template>
  <div v-if="club">
<div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link class="navbar-brand" :to="{ name: 'club-home', params: { id: club.id }}">{{ club.name }}</router-link>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                  <li>
                    <router-link data-toggle="collapse"
                      data-target=".navbar-collapse"
                      :to="{ name: 'club-sessions', params: { id: club.id }}">
                        Results
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      data-toggle="collapse"
                      data-target=".navbar-collapse"
                      :to="{ name: 'club-contact', params: { id: club.id }}">
                        Contact us
                    </router-link>
                  </li>
                </ul>
    <ul class="nav navbar-nav navbar-right">
        <li class="dropdown" v-if="!loggedIn">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Login</a>
			<ul class="dropdown-menu">
              <login></login>
            </ul>
        </li>
        <li v-if="loggedIn">
          <a href="#" data-toggle="collapse" data-target=".navbar-collapse" v-on:click.prevent="logout">Logout</a>
        </li>
    </ul>
            </div>


        </div>
    </div>

    <router-view style="margin-top: 60px"></router-view>
  </div>
</template>

<script>

import Login from '@/auth/login'
import auth from '@/auth'
import { EventBus } from '@/eventbus.js'

const query = `
query club($id: ID!) {
  club(id: $id) {
    id
    name
  }
}`

export default {
  created () {
    let vm = this
    EventBus.$on('authorization', e => {
      vm.loggedIn = !!e.authorization
    })
    this.fetch(this.$route.params.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.fetch(to.params.id)
    next()
  },
  data () {
    return {
      club: null,
      loggedIn: auth.user.authenticated
    }
  },
  components: {
    Login
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
    logout () {
      auth.logout()
    }
  }
}
</script>
