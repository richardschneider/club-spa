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
  padding-left: 0;
  padding-right: 0;
}

.rank {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  border-radius: 10px;
  background: purple;
  color: white;
}

</style>
