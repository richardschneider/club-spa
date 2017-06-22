<template>
  <div v-if="auction.bids.length > 0">
    <table class="auction">
      <thead>
        <tr>
          <th v-for="seat in seats">{{ seat }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows">
          <td v-for="bid in row">
            <bid-name :bid="bid"></bid-name>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BidName from '@/components/BidName'

export default {
  props: ['auction'],
  components: {
    BidName
  },
  computed: {
    seats () {
      let seat = this.auction.dealer
      let seats = []
      for (let i = 0; i < 4; ++i) {
        seats.push(seat.symbol)
        seat = seat.next
      }
      return seats
    },
    rows () {
      let rows = []
      for (let i = 0; i < this.auction.bids.length; ++i) {
        let n = Math.floor(i / 4)
        rows[n] = rows[n] || []
        rows[n].push(this.auction.bids[i])
      }
      return rows
    }
  }
}
</script>

<style>
  .auction th {
    min-width: 3.3em;
    font-size: 90%;
  }
  .auction thead {
    border-bottom: 1px solid silver;
  }
</style>
