/* Initial code from https://auth0.com/blog/build-an-app-with-vuejs/ */

import {EventBus} from '@/eventbus.js'
const jwtDecode = require('jwt-decode')

// URL and endpoint constants
const API_URL = 'https://club-server.herokuapp.com/'
const LOGIN_URL = API_URL + 'login'

let user = {
  authenticated: false,
  id: 0,
  name: ''
}

function setUser (authorization, remember) {
  user.authenticated = !!authorization
  if (user.authenticated) {
    if (remember) {
      localStorage.setItem('authorization', authorization)
    }
    let token = authorization.split(' ')[1]
    let decoded = jwtDecode(token)
    user.id = decoded.id
    user.name = decoded.name
    EventBus.$emit('authorization', { url: API_URL, authorization: authorization })
  }
}

export default {

  googleUrl: `${API_URL}auth/google`,

  // User object will let us check authentication status. When authenticated
  // it contains a name and an id.
  user: user,

  // Send a request to the login URL and save the returned authorization
  // emits 'authorization' with { url: '...', authorization: 'Bearer ...'}
  login (context, creds, remember) {
    return context.$http
      .post(LOGIN_URL, creds)
      .then(res => setUser(res.data.authorization, remember))
  },

  socialLogin: setUser,

  autoLogin () {
    let authorization = localStorage.getItem('authorization')
    setUser(authorization, false)
  },

  // To log out, we just need to remove the authorization
  logout () {
    // TODO: tell server
    localStorage.removeItem('authorization')
    EventBus.$emit('authorization', { url: API_URL, authorization: null })
    user.authenticated = false
    user.id = 0
    user.name = ''
  }
}
