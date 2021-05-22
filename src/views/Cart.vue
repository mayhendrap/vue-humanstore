<template>
  <v-container>
      <v-row>
          <v-col md="7" class="mt-5">
              <h3>Keranjang</h3>
              <v-divider></v-divider>
              <template v-for="product in products">
                <CartProductCard :product="product" :key="product.id"/>
              </template>
          </v-col>
          <v-col md="5" class="mt-7">
              <v-card class="pr-4 pb-4 pl-4">
                    <v-card-title class="">Ringkasan Belanja</v-card-title>
                    <div class="flex-total">
                        <v-card-subtitle>Total Harga({{productsQty}} barang)</v-card-subtitle>
                        <v-card-subtitle>{{ currentTotalPrice }}</v-card-subtitle>
                    </div>
                    <v-divider></v-divider>
                    <div class="flex-total">
                        <v-card-title class="total-price">Total Harga({{productsQty}} barang)</v-card-title>
                        <v-card-title class="total-price">{{ currentTotalPrice }}</v-card-title>
                    </div>
                    <v-btn
                    elevation="0"
                    medium
                    >
                        Beli({{productsQty}})
                    </v-btn>
              </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CartProductCard from '../components/CartProductCard.vue'

export default {
    components: {
        CartProductCard
    },
    computed: {
        ...mapGetters({products: "getCurrentCart", currentTotalPrice: "getCurrentTotalPriceProducts", productsQty: "getCurrentProductsQty"})
    }
}
</script>

<style scoped>
    .flex-total {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .total-price {
        font-size: 16px;
    }
</style>