<template>
  <v-container class="my-5">
    <v-row>
      <v-col sm="12" md="8">
        <v-img
          height="550"
          :src="image"
        ></v-img>
      </v-col>
      <v-col sm="12" md="4">
        <v-card
          tile
          elevation="0"
        >
          <v-card-subtitle>{{ product.category }}</v-card-subtitle>
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle>{{ price }}</v-card-subtitle>
          <v-card-text>
            {{ product.desc }}
          </v-card-text>
          <template v-if="user == null">
            <router-link to="/login" class="auth-button">
              <v-btn
                block
                elevation="1"
                large
              >
                  Masuk
              </v-btn>
            </router-link>
          </template>
          <template v-else>
              <v-btn
                block
                elevation="1"
                large
                @click="addProduct"
              >
                  + Keranjang
              </v-btn>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import convertRupiah from '../utils/convertRupiah.js'

export default {
  methods: {
    ...mapActions(["setSingleProductFromFirebase"]),
    ...mapMutations(["addProductToCart", "setCountCart", "setCartTotalPrice"]),
    addProduct() {
      this.addProductToCart(this.product)
      this.setCountCart()
      this.setCartTotalPrice()
    }
  },
  computed: {
    ...mapGetters({product: "getCurrentProduct", user: "getCurrentUser"}),
      image() {
          const baseUrl = process.env.BASE_URL || 'http://localhost:8080/'
          return baseUrl + this.product.image
      },
      price() {
          return convertRupiah(this.product.price)
      }
  },
  mounted() {
    let productId = this.$route.params.id
    this.setSingleProductFromFirebase(productId)
  }
}
</script>

<style scoped>
  .auth-button {
    text-decoration: none;
    color: rgb(31, 31, 31);
  }
</style>