<template>
  <div>
    <h2>{{user.name}}</h2>
    <h4>Results</h4>
    <ul class="list-inline">
      <li v-for="result in results">
        <result :result="result"></result>
      </li>
    </ul>
  </div>
</template>

<script>
import auth from '@/auth'
import Result from './result'

export default {
  data () {
    return {
      user: auth.user,
      results: [
        { session: { id: 1, title: 'Winter Pairs', date: '2017-07-01' }, ranking: { rank: 1, score: 62.23, scale: 1 }, title: 'Joe Blogs / John Smith' },
        { session: { id: 1, title: 'Winter Pairs', date: '2017-07-08' }, ranking: { rank: 5, score: 50.23, scale: 0.5 }, title: 'Joe Blogs / John Smith' },
        { session: { id: 1, title: 'Winter Pairs', date: '2017-07-15' }, ranking: { rank: 2, score: 55.23, scale: 0.8 }, title: 'Joe Blogs / John Smith' },
        { session: { id: 1, title: 'Winter Pairs', date: '2017-07-22' }, ranking: { rank: 3, score: 56.23, scale: 0.7 }, title: 'Joe Blogs / John Smith' }
      ]
    }
  },
  components: {
    Result
  }
}
</script>
