<template>
<b-navbar toggleable="md" type="dark" variant="info">
  <b-navbar-brand :to="{ name: 'Home' }">Pokemon Team Picker</b-navbar-brand>
  <b-navbar-nav>
    <b-nav-item :to="{ name: 'Types' }">Types</b-nav-item>
    <b-nav-item :to="{ name: 'Team' }">Your Team <img v-for="n in numberInTeam" :key="n" src="https://cdn.shopify.com/s/files/1/0463/0789/products/1_dd8a036f-e6f6-46f5-9675-c8105885b4db_1200x1200.png?v=1571564518"></b-nav-item>
  </b-navbar-nav>
</b-navbar>
</template>
<script>
export default {
  name: 'Navbar',
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
  }
}
</script>

<style scoped>
.bg-info {
  background-color: #f94b4b !important;
  border-bottom: 2px solid #333;
  border-right: 2px solid #333;
  border-left: 2px solid #333;
  font-family: 'Sen', sans-serif;
}

li {
  width: auto;
}

li img {
 width: 25px;
 height: 25px;
}
</style>
