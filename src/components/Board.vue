<template>
  <div class="board">
    <table>
      <tr>
        <td class="cell">
          board {{ board.number }} <br/>
          dealer {{ board.dealer }} <br/>
          vuln {{ board.vulnerability}}
        </td>
        <td class="cell"><board-hand :hand="hand.north"></board-hand></td>
        <td class="cell"></td>
      </tr>
      <tr>
        <td class="cell"><board-hand :hand="hand.west"></board-hand></td>
        <td class="cell"></td>
        <td class="cell"><board-hand :hand="hand.east"></board-hand></td>
      </tr>
      <tr>
        <td class="cell"></td>
        <td class="cell"><board-hand :hand="hand.south"></board-hand></td>
        <td class="cell"></td>
      </tr>
    </table>
  </div>
</template>

<style>
  .board .cell {
    min-width: 14ex;
    padding-right: 1ex;
    padding-left: 1ex;
    vertical-align: top;
  }
</style>

<script>
import BoardHand from '@/components/BoardHand'
var bridge = require('bridge.js')

export default {
  props: ['board'],
  components: {
    BoardHand
  },
  data () {
    return {}
  },
  computed: {
    hand () {
      return bridge.pbn.importDeal(this.board.deal)
    }
  }
}

</script>
