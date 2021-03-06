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
      path: '/auth/:auth',
      component: require('../auth/callback')
    },
    {
      name: 'user-home',
      path: '/user/home',
      component: require('../pages/user/home')
    },
    {
      path: '/join',
      component: require('../pages/user/join')
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
        },
        {
          name: 'club-admin',
          path: 'admin',
          component: require('../pages/club/admin'),
          children: [
            {
              path: '',
              redirect: { name: 'club-admin-profile' }
            },
            {
              name: 'club-admin-profile',
              path: 'profile',
              component: require('../pages/club/admin/profile')
            },
            {
              name: 'club-admin-competitions',
              path: 'competitions',
              component: require('../pages/club/admin/competitions')
            },
            {
              name: 'club-admin-competition',
              path: 'competition/:cid?',
              component: require('../pages/club/admin/competition')
            }
          ]
        }
      ]
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
