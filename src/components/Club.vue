<template>
  <div class="club">
    <search :items="clubs">
      <template slot="results" scope="props">
        <li class="list-group-item">
          <router-link :to="{ name: 'club-sessions', params: { id: props.item.id }}">
            {{ props.item.name }}
          </router-link>
        </li>
      </template>
    </search>
  </div>
</template>

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

