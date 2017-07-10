<template>
  <div>
    <h4 v-if="!competitionId">New competition</h4>
    <h4 v-if="competitionId">Change competition</h4>
    <hr/>
    <form class="competition-form">
      <div class="form-group">
        <label for="name">name</label>
        <input v-model="competition.name" id="name" type="text" class="form-control" >
        <span class="help-block">A competition name, such as "Winter Pairs".</span>
      </div>
      <div class="form-group">
        <label for="type">type</label>
        <select v-model="competition.type" class="form-control" id="type">
          <option>club</option>
          <option>tournament</option>
          <option>casual</option>
        </select>
      </div>
      <div class="form-group">
        <button :disabled="!canSave" v-on:click.stop="save()" type="button" class="btn btn-primary">Save</button>
        <button v-if="competitionId" v-on:click.stop="fetch()" type="button" class="btn btn-default">Revert</button>
      </div>
    </form>
  </div>
</template>

<script>
const query = `
query competition($id: ID!) {
  competition(id: $id) {
    name
    type
  }
}`

const mutate = `
mutation save($id: ID, $input: CompetitionInput) {
  upsertCompetition(id: $id, input: $input) {
    id
  }
}
`

const defaultCompetition = {
  name: '',
  type: 'club'
}

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
      competition: {},
      competitionId: null
    }
  },
  computed: {
    canSave () {
      return this.competition.clubId &&
          this.competition.name.trim() !== ''
    }
  },
  components: {
  },
  methods: {
    fetch (clubId, competitionId) {
      let vm = this
      if (arguments.length === 0) {
        clubId = vm.competition.clubId
        competitionId = vm.competitionId
      }
      vm.competition = Object.assign({}, defaultCompetition)
      vm.competition.clubId = clubId
      vm.competitionId = competitionId
      if (vm.competitionId) {
        vm.$bridgeclub.queryNoCache(query, { id: vm.competitionId })
          .then(body => {
            if (body.data.competition) {
              vm.competition = body.data.competition
              vm.competition.clubId = clubId
            } else {
              vm.competitionId = null
            }
          })
      }
    },
    save () {
      let vm = this
      vm.$bridgeclub
        .mutate(mutate, { id: vm.competitionId, input: vm.competition })
        .then(() => vm.$router.push({ name: 'club-admin-competitions' }))
    }
  }
}
</script>
