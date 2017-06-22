import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import Club from '@/components/Club'
import ClubSessions from '@/components/ClubSessions'
import SessionResults from '@/pages/SessionResults'
import SessionPairResults from '@/pages/SessionPairResults'
import Board from '@/pages/Board'
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
      path: '/club',
      component: Club
    },
    {
      name: 'club-sessions',
      path: '/club/:id/sessions',
      component: ClubSessions
    },
    {
      name: 'session-results',
      path: '/session/:id/results',
      component: SessionResults
    },
    {
      name: 'board',
      path: '/board/:id',
      component: Board
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
