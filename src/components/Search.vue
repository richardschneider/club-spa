<template>
  <form class="search-form">
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
    
    <div v-show="noresults">
      <slot name="noresults">
        No results
      </slot>
    </div>
    
    <ul class="list-group">
      <slot name="results"
        v-for="item in results"
        :filter="filter"
        :item="item">
        need a slot
      </slot>
    </ul>
    
  </form>
</template>

<style>
.search-form a,
.search-form a:link,
.search-form a:active,
.search-form a:visited,
.search-form a:hover {
    color: black;
    text-decoration: none;
}

.search-form a:hover {
    text-decoration: underline;
}
.search-form input {
  padding:10px;
	font-family: FontAwesome, "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: inherit;
}
</style>

<script>

export default {
  props: {
    items: Array,
    placeholder: {
      type: String,
      default: '\uF002 Search'
    }
  },
  data () {
    return {
      filter: ''
    }
  },
  computed: {
    filtering () { return this.filter.length > 0 },
    noresults () { return this.filtering && this.results.length === 0 },
    results () {
      if (!this.filtering) return this.items
      let q = this.filter.toLowerCase()
      let m = o => Object.keys(o).some(k => o[k].toString().toLowerCase().indexOf(q) > -1)
      return this.items.filter(e => m(e))
    }
  },
  methods: {
    clear () { this.filter = '' }
  }
}

</script>
