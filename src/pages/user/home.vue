<template>
  <div>
    user home
    <h2>{{user.name}}</h2>
  </div>
</template>

<script>
import auth from '@/auth'

export default {
  data () {
    return {
      user: auth.user
    }
  }
}
</script>
