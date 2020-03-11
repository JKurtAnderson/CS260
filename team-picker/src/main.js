import Vue from 'vue'
import App from './App.vue'
import router from './router'
import pokemons from './pokemon-list.js'
import types from './type-list.js'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


Vue.config.productionTip = false

Vue.use(BootstrapVue);

let data = {
  pokemons: pokemons,
  types: types,
};

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')

console.log(pokemons);
