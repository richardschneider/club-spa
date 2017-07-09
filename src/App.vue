<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { EventBus } from '@/eventbus.js'
import auth from '@/auth'

export default {
  name: 'app',
  created () {
    EventBus.$on('error', this.show)
    auth.autoLogin()
  },
  methods: {
    show (e) {
      if (e.response && e.response.data) {
        e = e.response.data
      }
      this.$toast(e.message || e.toString())
    }
  }
}
</script>

<style>
@font-face {
  font-family: "suits";
  src:url("assets/suits.eot");
  src:url("assets/suits.eot?#iefix") format("embedded-opentype"),
    url("assets/suits.woff") format("woff"),
    url("assets/suits.ttf") format("truetype"),
    url("assets/suits.svg#suits") format("svg");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: suits,"Helvetica Neue",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 10px;
}

.spades, .hearts, .diams, .clubs {
  font-size: 80%;
  line-height: 100%;
}
.spades, .clubs {
  color: black;
}
.hearts, .diams {
  color: red;
}

.risk {
  font-weight: bold;
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

  .__vev_calendar-wrapper .cal-wrapper,
  .__vev_calendar-wrapper .events-wrapper
  {
    padding-top: 0 !important;
    color: inherit;
  }
  .__vev_calendar-wrapper .cal-wrapper .date-num,
  .__vev_calendar-wrapper .cal-wrapper .cal-body .weeks .item
  {
    line-height: 30px !important;
  }
  .__vev_calendar-wrapper .cal-wrapper .cal-header {
    padding-bottom: 0 !important;
  }
  .__vev_calendar-wrapper .cal-wrapper .cal-body .dates .item .is-event,
  .__vev_calendar-wrapper .cal-wrapper .cal-body .dates .item .is-today
  {
    width: 28px;
    height: 28px;
    margin-left: -14px;
    margin-top: -15px;
    box-shadow: 0 0 1px #f29543;
  }
  .__vev_calendar-wrapper .events-wrapper {
    background-color: inherit !important;
  }
  .__vev_calendar-wrapper .events-wrapper .event-item {
    padding: 0;
    margin-top: 0;
    box-shadow: none;
  }
  .__vev_calendar-wrapper .events-wrapper .date
  {
    display: none;
  }

  .panel-data {
    margin-bottom: 15px;
  }

  .panel-data>.panel-heading {
    line-height: 1;
    color: darkkhaki;
    padding: 0;
    border: 0;
    margin: 0;
  }

  .panel-data>.panel-body {
    padding: 3px 0;
    font-size: 110%;
  }

  .ap-suggestion em {
    color: #F06E0E;
  }

</style>
