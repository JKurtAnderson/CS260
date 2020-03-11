<template>
<div class="home">
  <div class="wrapper">
    <div class="search">
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="searchText" />
      </form>
    </div>
  </div>
  <PokemonList :pokemons="pokemons" />
</div>
</template>

<script>
// @ is an alias to /src
import PokemonList from '@/components/PokemonList.vue'

export default {
  name: 'Home',
  components: {
    PokemonList
  },
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    pokemons() {
      return this.$root.$data.pokemons.filter(pokemon => pokemon.name.toLowerCase().search(this.searchText) >= 0);
    }
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
</style>
