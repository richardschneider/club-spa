<template>
<div class="alert alert-danger" v-show="message" v-on:click="show('')">
  {{ message }}
</div>
</template>

<script>
import { EventBus } from '@/eventbus.js'

export default {
  created () {
    EventBus.$on('error', this.show)
  },
  data () {
    return { message: '' }
  },
  methods: {
    show (e) {
      this.message = e.message || e.toString()
    }
  }
}
</script>
