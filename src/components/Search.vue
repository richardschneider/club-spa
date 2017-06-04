<template>
  <form>
    <div class="form-group has-feedback">
      <input 
        type="text"
        class="form-control"
        v-model="filter"
        v-bind:placeholder="placeholder"
      >
      <span class="form-control-feedback" v-if="filtering" v-on:click="clear" style="pointer-events: all; cursor: pointer">
          <strong>X</strong>
      </span>
     </div>
  </form>
</template>

<script>

export default {
  props: {
    items: Array,
    placeholder: {
      type: String,
      default: 'Search'
    }
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
