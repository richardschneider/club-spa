<template>
  <div>
    <h4 v-if="!competitionId">New competition</h4>
    <h4 v-if="competitionId">Change competition</h4>
    <hr/>
    <form class="competition-form">
      <div class="form-group">
        <label for="name">name</label>
        <input v-model="name" id="name" type="text" class="form-control" >
        <span class="help-block">A competition name, such as "Winter Pairs".</span>
      </div>
      <div class="form-group">
        <label for="type">type</label>
        <select v-model="type" class="form-control" id="type">
          <option>club</option>
          <option>tournament</option>
          <option>casual</option>
        </select>
      </div>
      <div class="form-group">
        <label for="startDate">start</label>
        <datepicker
          v-model="startDate"
          name="start"
          :calendar-button="true"
          calendar-button-icon="fa fa-calendar"
          :bootstrapStyling="true"></datepicker>
        <span class="help-block">The starting date of the competition.</span>
      </div>
      <div class="form-group">
        <button :disabled="!canSave" v-on:click.stop="save()" type="button" class="btn btn-primary">Save</button>
        <button v-if="competitionId" v-on:click.stop="fetch()" type="button" class="btn btn-default">Revert</button>
      </div>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

const query = `
query competition($id: ID!) {
  competition(id: $id) {
    name
    type
    startDate
  }
}`

const mutate = `
mutation save($id: ID, $input: CompetitionInput) {
  upsertCompetition(id: $id, input: $input) {
    id
  }
}
`

export default {
  created () {
    this.fetch(this.$route.params.id, this.$route.params.cid)
  },
  beforeRouteUpdate (to, from, next) {
    this.fetch(to.params.id, to.params.cid)
    next()
  },
  data () {
    return {
      name: '',
      type: 'club',
      startDate: '',
      competition: {},
      competitionId: null
    }
  },
  computed: {
    canSave () {
      return this.clubId &&
        this.startDate &&
        this.name.trim() !== ''
    }
  },
  components: {
    Datepicker
  },
  methods: {
    fetch (clubId, competitionId) {
      let vm = this
      if (arguments.length === 0) {
        clubId = vm.clubId
        competitionId = vm.competitionId
      }
      vm.clubId = clubId
      vm.competitionId = competitionId
      if (vm.competitionId) {
        vm.$bridgeclub.queryNoCache(query, { id: vm.competitionId })
          .then(body => {
            if (body.data.competition) {
              vm.name = body.data.competition.name
              vm.type = body.data.competition.type
              vm.clubId = clubId
              vm.startDate = Date.parseBridgeHubDate(body.data.competition.startDate)
            }
          })
      }
    },
    save () {
      let vm = this
      let competition = {
        clubId: vm.clubId,
        name: vm.name,
        type: vm.type,
        startDate: vm.startDate.toBridgeHubDateString()
      }
      console.log('competition', competition)
      vm.$bridgeclub
        .mutate(mutate, { id: vm.competitionId, input: competition })
        .then(() => vm.$router.push({ name: 'club-admin-competitions' }))
    }
  }
}
</script>
