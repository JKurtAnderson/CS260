<template>
<div class="wrapper">
  <div class="products">
    <div class="message" v-if="!cart.length"><h1>Nothing in Cart</h1></div>
    <div class="product" v-for="product in cart" :key="product.id">
      <img :src="'/images/products/'+product.image">
      <h1>{{product.name}}</h1>
      <h2>Quantity: {{product.quantity}}</h2>
      <h2>Total Price: ${{totalPrice(product)}}</h2>
      <button @click="removeFromCart(product)" class="auto">Remove From Cart</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CartList',
  props: {
    cart: Array
  },
  methods: {
    removeFromCart(product) {
      this.$root.$data.cart.splice(this.$root.$data.cart.indexOf(product), 1);
    },
    totalPrice(product) {
      return product.price.substring(1) * product.quantity;
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

.products {
  margin-top: 20px;
}

.product {
  margin: 10px;
  margin-top: 50px;
  width: 700px;
  height: 100px;
  background: #F2921D;
  color: #000;
  display: flex;
  justify-content: left;
  padding: 5px;
}

.product img {
  border: 2px solid #333;
  height: 90px;
  width: 72px;
  object-fit: cover;
}

.product h1 {
  font-size: 16px;
  margin: auto;
}

.product h2 {
  font-size: 14px;
    float: flex-end;
    margin: auto;
}

.product button {
  float: flex-end;
  margin-top: auto;
  margin-bottom: auto;
}

.price {
  display: flex;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}
</style>
