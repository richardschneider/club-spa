<template>
  <form>
    <div class="form-group has-feedback">
      <input v-model="filter" type="text" class="form-control" placeholder="search for ..." >
      <span class="form-control-feedback" v-if="filtering" v-on:click="clear" style="pointer-events: all; cursor: pointer">
          <strong>X</strong>
      </span>
     </div>
  </form>
</template>

<script>

export default {
  props: {
    items: Array
  },
  data () {
    return {
      filter: ''
    }
  },
  computed: {
    filtering () { return this.filter.length > 0 }
  },
  methods: {
    clear () { this.filter = '' }
  }
}

</script>
