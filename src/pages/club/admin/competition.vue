<template>
  <div>
    <h4>New competition</h4>
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
      competition: {
        name: '',
        type: 'club',
        clubId: null
      },
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
      if (clubId) {
        this.competition.clubId = clubId
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
