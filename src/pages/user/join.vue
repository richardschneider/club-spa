<template>
  <form class="join-form">
    <h1>Join the Bridge Hub</h1>
    <div class="form-group">
      <label for="name">username</label>
      <input v-model="name" id="name" type="text" class="form-control" >
      <span class="help-block">This is your public name.</span>
    </div>
    <div class="form-group">
      <label for="email">email</label>
      <input v-model="email" id="email" type="email" class="form-control" >
      <span class="help-block">We promise not to spam.</span>
    </div>
    <div class="form-group">
      <label for="password">password</label>
      <input v-model="password" id="password" type="password" class="form-control" >
    </div>
    <hr/>
    <div class="form-group">
      <button v-on:click.stop="join" type="button" class="btn btn-primary">Join</button>
    </div>
  </form>
</template>

<script>
import auth from '@/auth'

const mutate = `
mutation join($name: String!, $email: String!, $password: String!) {
  createUser(name: $name, email: $email, password: $password) {
    id
  }
}
`

export default {
  data () {
    return {
      name: null,
      email: null,
      password: ''
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
    join () {
      let vm = this
      vm.$bridgeclub
        .mutate(mutate, { name: vm.name, email: vm.email, password: vm.password })
        .then(() => auth.login(vm, { username: vm.email, password: vm.password }, true))
        .then(() => vm.$router.push({ name: 'user-home' }))
    }
  }
}
</script>
