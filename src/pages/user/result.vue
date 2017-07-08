<template>
  <div class="result-card" @click="$router.push({ name: 'session-results', params: { id: result.session.id }})">
    {{ result.session.title }}
    <small>{{ result.session.date }}</small>
    <span class="ranking">
      <percent :value="result.ranking.score"></percent>%
      <i class="fa fa-certificate" aria-hidden="true"></i>
      {{ result.ranking.rank }}
    </span>
    <div>{{ result.title }}</div>
    <star-rating
      :inline="false"
      inactive-color="white"
      :item-size="18"
      :read-only="true"
      :rating="stars"
      :show-rating="false"
      :increment="0.01">
    </star-rating>
  </div>
</template>

<script>
import percent from '@/components/percent'
import {StarRating} from 'vue-rate-it'

export default {
  props: ['result'],
  components: {
    StarRating,
    percent
  },
  computed: {
    stars () {
      return this.result.ranking.scale * 5
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style>
  .result-card {
    border: 1px solid #d1d5da;
    border-radius: 3px;
    padding: 6px;
    width: 24em;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .result-card .ranking {
    float: right;
  }
  .result-card .fa-certificate {
    color: limegreen;
  }
</style>
