/* Initial code from https://auth0.com/blog/build-an-app-with-vuejs/ */

import {EventBus} from '@/eventbus.js'

// URL and endpoint constants
const API_URL = 'https://club-server.herokuapp.com/'
const LOGIN_URL = API_URL + 'login'
const SIGNUP_URL = API_URL + 'signup'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned authorization
  // emits 'authorization' with { url: '...', authorization: 'Bearer ...'}
  login (context, creds) {
    return context.$http
      .post(LOGIN_URL, creds)
      .then(res => {
        localStorage.setItem('authorization', res.data.authorization)
        this.user.authenticated = true
        EventBus.$emit('authorization', { url: API_URL, authorization: res.data.authorization })
        return true
      })
  },

  autoLogin () {
    let authorization = localStorage.getItem('authorization')
    if (authorization) {
      this.user.authenticated = true
      EventBus.$emit('authorization', { url: API_URL, authorization: authorization })
    }
  },

  signup (context, creds) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)
      localStorage.setItem('access_token', data.access_token)
      this.user.authenticated = true
    }).error((err) => {
      EventBus.$emit('error', err)
    })
  },

  // To log out, we just need to remove the authorization
  logout () {
    // TODO: tell server
    localStorage.removeItem('authorization')
    EventBus.$emit('authorization', { url: API_URL, authorization: null })
    this.user.authenticated = false
  }
}
