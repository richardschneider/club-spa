<template>
  <div class="board">
    <table>
      <tr>
        <td class="cell">
          board {{ board.number }} <br/>
          dealer {{ board.dealer }} <br/>
          vuln {{ board.vulnerability}}
        </td>
        <td class="cell" colspan="2"><board-hand :hand="hand.north"></board-hand></td>
      </tr>
      <tr>
        <td class="cell" colspan="2"><board-hand :hand="hand.west"></board-hand></td>
        <td class="cell"><board-hand :hand="hand.east"></board-hand></td>
      </tr>
      <tr>
        <td class="cell hcp">
          <board-hcp :hands="hand"></board-hcp>
        </td>
        <td class="cell"><board-hand :hand="hand.south"></board-hand></td>
        <td class="cell"><board-solution :board="board"></board-solution></td>
      </tr>
    </table>

  </div>
</template>

<style>
  .board .cell {
    min-width: 8em;
    padding-right: 3px;
    padding-left: 3px;
    vertical-align: top;
  }
  .board .cell.hcp {
    vertical-align: middle;
    text-align: center;
  }
</style>

<script>
import BoardHand from '@/components/BoardHand'
import BoardHcp from '@/components/BoardHcp'
import BoardSolution from '@/components/BoardSolution'
var bridge = require('bridge.js')

export default {
  props: ['board'],
  components: {
    BoardHand,
    BoardHcp,
    BoardSolution
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
