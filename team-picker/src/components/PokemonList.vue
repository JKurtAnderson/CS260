<template>
<div class="wrapper">
  <div class="pokemon-list">
    <div class="pokemon-view" v-for="pokemon in pokemons" :key="pokemon.id">
      <div class="info">
        <h1>{{pokemon.id}}: {{titleCase(pokemon.name)}}</h1>
      </div>
      <div class="button-holder">
        <button v-if="pokemon.selected === true" @click="addToTeam(pokemon)">Remove from Team</button>
        <button v-if="pokemon.selected === false && numberInTeam < 6" @click="addToTeam(pokemon)">Add to Team</button>
        <button v-if="pokemon.selected === false && numberInTeam >= 6" disabled>Team Full</button>
      </div>
      <div class="image">
        <img :src="pokemon.sprite">
      </div>
      <div class="type">
        <img :src='"https://serebii.net/pokedex-bw/type/" + pokemon.types[0] + ".gif"'>
        <img v-if="pokemon.types.length > 1" :src='"https://serebii.net/pokedex-bw/type/" + pokemon.types[1] + ".gif"'>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'PokemonList',
  props: {
    pokemons: Array
  },
  methods: {
    titleCase(str) {
      str = str.replace(/-/g, " ");
      var splitStr = str.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(' ');
    },
    addToTeam(pokemon) {
      pokemon.selected = !pokemon.selected;
    }
  },
  computed: {
    numberInTeam() {
      const reducer = (total, pokemon) => {
        if (pokemon.selected) {
          return total + 1;
        } else {
          return total;
        }
      }
      return this.$root.$data.pokemons.reduce(reducer, 0);
    }
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/no-use-v-if-with-v-for": "off"
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemon-list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.pokemon-view {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
  border: 2px solid #333;
}

.pokemon-view img {
  height: 200px;
  width: 200px;
}

.pokemon-view .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  background: #f94b4b;
  color: #000;
  padding: 10px 30px;
  height: 60px;
}

.info h1 {
  font-size: 14px;
  font-family: 'Press Start 2P'
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}

.type {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
}

.type img {
  width: 75px;
  height: auto;
}

.button-holder {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  height: 50px;
  width: 100%;
  background: #000;
  color: white;
  border: none;
  font-family: 'Sen', sans-serif;
}

button:disabled {
color: grey !important;
}
</style>
