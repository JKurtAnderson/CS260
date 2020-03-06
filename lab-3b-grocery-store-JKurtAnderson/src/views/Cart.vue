<template>
<div>
  <CartList :cart="cart" />
</div>
</template>

<script>
import CartList from "../components/CartList.vue"
export default {
  name: 'Cart',
  components: {
    CartList
  },
  data() {
    return {
      country: '',
    }
  },
  computed: {
    cart() {
      return this.$root.$data.cart;
    }
  },
  methods: {
    select(country) {
      this.country = country;
    }
  }
}
</script>
