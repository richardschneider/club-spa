<template>
  <div>
    <span class="auction">dealer {{auction.dealer.toString()}} seats {{ seats }} bids {{auction.toString()}}</span>
    <table>
      <thead>
        <tr>
          <th v-for="seat in seats">{{ seat }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows">
          <td v-for="bid in row">
            {{ bid.toString() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DenominationName from '@/components/DenominationName'

export default {
  props: ['auction'],
  components: {
    DenominationName
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
