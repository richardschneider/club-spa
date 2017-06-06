<template>
  <span class="highlight">
    <span v-for="p in parts">
      <span v-bind:class="p.effect">{{ p.text }}</span>
    </span>
  </span>
</template>

<style>
  .text-highlight {
    color: #F06E0E;
  }
  .bg-highlight {
    background-color: lime;
  }
</style>

<script>

export default {
  props: {
    text: String,
    phrase: String,
    effect: {
      type: String,
      default: 'text-highlight'
    }
  },
  data () {
    return {}
  },
  computed: {
    parts () {
      let nohighlight = [{ text: this.text }]
      if (this.phrase === '') return nohighlight
      let i = this.text.toLowerCase().indexOf(this.phrase.toLowerCase())
      if (i < 0) return nohighlight

      return [
        { text: this.text.slice(0, i) },
        { text: this.text.slice(i, i + this.phrase.length), effect: this.effect },
        { text: this.text.slice(i + this.phrase.length) }
      ]
    }
  }
}

</script>
