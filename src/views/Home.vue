<template>
  <v-container class="my-5">
    <v-row>
      <v-col v-for="product in products" :key="product.id" xs="12" sm="4" md="3">
        <HomeProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import HomeProductCard from '../components/HomeProductCard.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      HomeProductCard
    },
    computed: {
      ...mapGetters({products: "getCurrentProducts"}),
    }
  }
</script>
