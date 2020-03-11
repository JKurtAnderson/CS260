<template>
<div class="wrapper">
  <div class="pokemons">
    <h1>Your Team</h1>
    <div class="message" v-if="teamList.length === 0">
      <h1>No Pokemon in Team</h1>
    </div>
    <div class="pokemon" v-for="pokemon in teamList" :key="pokemon.id">
      <img :src="pokemon.sprite">
      <h1>{{titleCase(pokemon.name)}}</h1>
      <div class="type">
        <img :src='"https://serebii.net/pokedex-bw/type/" + pokemon.types[0] + ".gif"'>
        <img v-if="pokemon.types.length > 1" :src='"https://serebii.net/pokedex-bw/type/" + pokemon.types[1] + ".gif"'>
      </div>
      <button @click="removeFromTeam(pokemon)" class="auto">Remove From Team</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'TeamList',
  props: {
    teamList: Array
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
    removeFromTeam(pokemon) {
      pokemon.selected = false;
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.pokemons {
  margin-top: 20px;
}

.pokemon {
  margin: 10px;
  margin-top: 10px;
  width: 700px;
  height: 105px;
  background: #f94b4b;
  color: #000;
  display: flex;
  justify-content: left;
  padding: 5px;
  border: 2px solid #333;
}

.pokemon img {
  background: white;
  border: 2px solid #333;
  height: 90px;
  width: auto;
  object-fit: cover;
}

.pokemon h1 {
  font-size: 16px;
  margin: auto;
  font-family: 'Press Start 2P';
  width: 450px;
  margin-left: 15px;
}

.pokemon button {
  float: flex-end;
  margin-top: auto;
  margin-bottom: auto;
  max-width: 250px;
  width: 250px;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
  font-family: 'Sen', sans-serif;
}

.type {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.type img {
  width: 75px;
  height: auto;
}

.auto {
  margin-left: auto;
}
</style>
