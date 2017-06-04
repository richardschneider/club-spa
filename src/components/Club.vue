<template>
  <div class="club">
    <search></search>
    <ul class="clubs list-group">
       <li v-for="club in clubs" class="list-group-item">
         <router-link :to="{ name: 'club-sessions', params: { id: club.id }}">{{ club.name }}</router-link>
       </li>
    </ul>
  </div>
</template>

<style>
a,
a:link,
a:active,
a:visited,
a:hover {
    color: black;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
.list-group-item {
  border: none;
}
</style>

<script>
import search from '@/components/Search'

const query = '{ clubs {id name} }'

export default {
  created () {
    var vm = this
    vm.$bridgeclub.query(query)
      .then(body => { vm.clubs = body.data.clubs })
  },
  data () {
    return { clubs: [] }
  },
  components: {
    search
  }
}
</script>

