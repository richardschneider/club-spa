import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import Club from '@/components/Club'
import ClubSessions from '@/components/ClubSessions'
import session from '@/pages/session'
import SessionPairResults from '@/pages/SessionPairResults'
import Game from '@/pages/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'login',
      component: require('../auth/login')
    },
    {
      path: '/club',
      component: Club
    },
    {
      name: 'club',
      path: '/club/:id',
      component: require('../pages/club'),
      children: [
        {
          path: '',
          component: require('../pages/club/home')
        },
        {
          name: 'club-contact',
          path: 'contact',
          component: require('../pages/club/contact')
        },
        {
          name: 'club-home',
          path: 'home',
          component: require('../pages/club/home')
        },
        {
          name: 'club-sessions',
          path: 'sessions',
          component: ClubSessions
        }
      ]
    },
    {
      name: 'club-edit',
      path: '/club/:id/edit',
      component: require('../pages/club/edit')
    },
    {
      name: 'session',
      path: '/session/:id',
      component: session,
      children: [
        {
          path: '',
          component: require('../pages/session/results')
        },
        {
          name: 'session-results',
          path: 'results',
          component: require('../pages/session/results')
        },
        {
          name: 'board',
          path: 'board-:number',
          component: require('../pages/session/board')
        },
        {
          path: 'ladder',
          component: require('../pages/session/ladder')
        }
      ]
    },
    {
      name: 'game',
      path: '/game/:id',
      component: Game
    },
    {
      name: 'session-pair-results',
      path: '/session/pair/:id/results',
      component: SessionPairResults
    }
  ]
})
