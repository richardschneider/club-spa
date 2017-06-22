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

.spades, .hearts, .diams, .clubs {
  font-size: 120%;
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

</style>
