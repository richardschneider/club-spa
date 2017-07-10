// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import bridgeclub from './plugins/bridgeclub'
import VueTouch from 'vue-touch'
import 'vue-event-calendar/dist/style.css'
import vueEventCalendar from 'vue-event-calendar'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(Toast)
Vue.use(vueEventCalendar, {locale: 'en'})
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(bridgeclub)
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBXgzADYa8ugpXsQDqvL00QXtoWDvByYB4'
  }
})

/*
 * Date utilities.
 */
if (!Date.prototype.toBridgeHubDateString) {
  (function () {
    function pad (number) {
      if (number < 10) {
        return '0' + number
      }
      return number
    }
    /* eslint no-extend-native: ["error", { "exceptions": ["Date"] }] */
    Date.prototype.toBridgeHubDateString = function () {
      return this.getFullYear() +
        '-' + pad(this.getMonth() + 1) +
        '-' + pad(this.getDate())
    }
  }())
}
if (!Date.parseBridgeHubDate) {
  Date.parseBridgeHubDate = function (s) {
    let parts = s.split('-')
    return new Date(parts[0], parseInt(parts[1], 10) - 1, parts[2])
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
