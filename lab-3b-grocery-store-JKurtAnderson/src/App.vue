<template>
<div id="app">
  <div class="menu">
      <div class="brand">
        <router-link to="/">
          <img src="/images/logo.png">
        </router-link>
      </div>
    <div class="side">
      <div class="menu-item">
        <router-link to="/browse">
          <div class="browse">
            <img src="/images/globe.png">
            <p>Browse</p>
          </div>
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/cart">
          <div class="cart">
            <img src="/images/love.png">
            <p>{{ itemsInCart }} items</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <router-view />
</div>
</template>

<script>
export default {
  name: 'Browse',
  computed: {
    itemsInCart() {
      //-return this.$root.$data.cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
      let total = 0;
      for(let i = 0; i < this.$root.$data.cart.length; i++) {
        total += this.$root.$data.cart[i].quantity;
      }
      return total;
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 50px 100px;

}

.menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 50px;
}

.menu a {
  color: #B84901;
}

.brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

.brand img {
  height: 200px;
}

.side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}

.side img {
  width: 50px;
}

.menu-item {
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0px;
}

.browse {
  margin-right: 50px;
}

.footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;
}

.footer-item {
  height: 30px;
  flex: 1;
  display: block;
  text-align: center;
}

.footer img {
  height: 20px;
  width: auto;
}
</style>
