<template>
<div>
  <TeamList :teamList="teamList" />
</div>
</template>

<script>
import TeamList from '../components/TeamList.vue'
export default {
  name: 'Team',
  components: {
    TeamList
  },
  computed: {
    teamList() {
      return this.$root.$data.pokemons.filter(pokemon => {if(pokemon.selected === true) console.log(pokemon.name); return pokemon.selected === true;});
    }
  },
}
</script>
