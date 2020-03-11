<template>
<div>
  <div>
  <h1>Filter By Type</h1>
    <ul>
      <li v-for="type in types" :key="type"><input v-on:click="select(type)" type="checkbox" :id="type" />
        <label :for="type"><img :src='"https://serebii.net/pokedex-bw/type/" + type + ".gif"'></label></li>
    </ul>
  </div>
  <PokemonList :pokemons="pokemons" />
</div>
</template>

<script>
import PokemonList from "../components/PokemonList.vue"
export default {
  name: 'Types',
  components: {
    PokemonList
  },
  data() {
    return {
      type1: '',
      type2: ''
    }
  },
  computed: {
    pokemons() {
      return this.$root.$data.pokemons.filter(pokemon => {
        if (this.type2 === '') {
          if (pokemon.types.length > 1) {
            return (pokemon.types[0] === this.type1) || (pokemon.types[1] === this.type1);
          } else {
            return pokemon.types[0] === this.type1;
          }
        }
        else {
          if (pokemon.types.length > 1) {
            return (pokemon.types[0] === this.type1 && pokemon.types[1] === this.type2) || (pokemon.types[0] === this.type2 && pokemon.types[1] === this.type1);
          } else {
            return false;
          }
        }
      });
    },
    types() {
      return this.$root.$data.types;
    }
  },
  methods: {
    select(type) {
      if (this.type1 === type) {
        this.type1 = this.type2;
        this.type2 = '';
      } else if (this.type2 === type) {
        this.type2 = '';
      } else if (this.type2 != '') {
        let cbox = document.getElementById(this.type2);
        cbox.checked = false;
        this.type2 = this.type1;
        this.type1 = type;
      } else {
        this.type2 = this.type1;
        this.type1 = type;
      }
    }
  }
}
</script>

<style>
ul {
  list-style-type: none;
}

li {
  display: inline-block;
  width: 125px;
}

input[type="checkbox"] {
  display: none;
}

label {
  border: 1px solid #fff;
  padding: 10px;
  display: block;
  position: relative;
  margin: 10px;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

label::before {
  background-color: white;
  color: white;
  content: " ";
  display: block;
  border-radius: 50%;
  border: 1px solid grey;
  position: absolute;
  top: -5px;
  left: -5px;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 28px;
  transition-duration: 0.4s;
  transform: scale(0);
}

label img {
  height: auto;
  width: 80px;
  transition-duration: 0.2s;
  transform-origin: 50% 50%;
}

:checked+label {
  border-color: #ddd;
}

:checked+label::before {
  content: "✓";
  background-color: grey;
  transform: scale(1);
}

:checked+label img {
  transform: scale(0.9);
  box-shadow: 0 0 5px #333;
  z-index: -1;
}
</style>
