/*
 * A social login will reload the SPA with the path /auth/:id/:auth
 *
 * :id is the user id
 * :auth is the user's authorization
 *
 * This code set the user's credentials and then show the user's home page.
 */

<template>
  <div>auth temp</div>
</template>

<script>

import auth from '@/auth'

export default {
  beforeRouteEnter (to, from, next) {
    auth.socialLogin(to.params.auth, false)
    next({name: 'user-home'})
  }
}
</script>
