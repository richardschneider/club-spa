<template>
  <div class="row club-admin">
    <div class="col-xs-4 col-sm-3 col-md-3">
  <div class="panel panel-default">
    <!-- Default panel contents -->
    <div class="panel-heading">club settings</div>

    <!-- List group -->
    <ul class="list-group menu">
      <li class="list-group-item" v-bind:class="{ current: isActive('profile') }">
        <router-link :to="{ name: 'club-admin-profile' }">Profile</router-link>
      </li>
      <li class="list-group-item" v-bind:class="{ current: isActive('competition') }">
        <router-link :to="{ name: 'club-admin-competitions' }">Competitions</router-link>
      </li>
    </ul>
  </div>
  </div>
    <div class="col-xs-8 col-sm-9 col-md-9">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    isActive (name) {
      return this.$route.path.includes(`/${name}`)
    }
  }
}
</script>

<style>
  .club-admin .menu .current {
    font-weight: bold;
    color: black !important;
  }
  .club-admin .menu .current a {
    font-weight: bold;
    color: black !important;
  }
  .club-admin .menu a:hover {
    text-decoration: none;
  }
</style>
