<template>
  <div id="app">
    <error-view></error-view>
    <router-view></router-view>
  </div>
</template>

<script>
import errorView from '@/components/Error'

export default {
  name: 'app',
  components: {
    errorView
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 10px;
}
.list-group-item {
  font-size: larger;
  border: none;
}

</style>
