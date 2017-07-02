<template>
  <div>
    <address v-if="contact">
      <strong v-if="contact.name">{{ contact.name }} <br/></strong>
      <div v-if="contact.address">
        <div v-if="contact.address.name">{{ contact.address.name }} <br/></div>
        <div v-if="contact.address.city">{{ contact.address.city }} {{ contact.address.postcode }}<br/></div>
        <div v-if="contact.address.administrative">{{ contact.address.administrative }} <br/></div>
        <div v-if="contact.address.country">{{ contact.address.country }} <br/></div>
      </div>
    </address>
    <div v-if="contact.phone">
      <a v-bind:href="phoneUrl">{{ contact.phone}}</a>
      <br/>
    </div>
    <div v-if="contact.email">
      <a v-bind:href="emailUrl">{{ contact.email}}</a>
      <br/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['contact'],
  computed: {
    phoneUrl () {
      return `tel:${this.contact.phone}`
    },
    emailUrl () {
      return `mailto:${this.contact.email}`
    }
  }
}
</script>
