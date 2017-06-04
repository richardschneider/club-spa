import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Club from '@/components/Club'
import ClubSessions from '@/components/ClubSessions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/club',
      component: Club
    },
    {
      name: 'club-sessions',
      path: '/club/:id/sessions',
      component: ClubSessions
    }
  ]
})
