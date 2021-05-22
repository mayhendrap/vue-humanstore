<template>
  <v-card class="mt-10 card-cart">
    <v-row>
        <v-col sm="4">
            <v-img width="200" :src="image" class="ml-4 mt-1"></v-img>
        </v-col>
        <v-col sm="8">
            <div>
                <v-card-title>{{ product.title }}</v-card-title>
                <v-card-subtitle>{{ price }}</v-card-subtitle>
                <div class="right-action">
                    <v-card-subtitle>{{ product.category }}</v-card-subtitle>
                    <div class="count-delete">
                        <div class="product-count">
                            <v-btn @click="handleReduceProduct" icon class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="rgb(58, 58, 58)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                            </v-btn>
                            <input :value="product.qty" class="count"/>
                            <v-btn @click="handleAddProduct" icon class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="rgb(58, 58, 58)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                            </v-btn>
                        </div>
                        <v-btn @click="handleRemoveProduct" icon class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="rgb(58, 58, 58)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import convertRupiah from '../utils/convertRupiah.js'
export default {
    props: ["product"],
    methods: {
        ...mapMutations(["addProductToCart", "reduceProductFromcart", "removeProductFromCart", "setCountCart", "setCartTotalPrice"]),
        handleAddProduct() {
            this.addProductToCart(this.product)
            this.setCountCart()
            this.setCartTotalPrice()
        },
        handleReduceProduct() {
            this.reduceProductFromcart(this.product)
            this.setCountCart()
            this.setCartTotalPrice()
        },
        handleRemoveProduct() {
            this.removeProductFromCart(this.product)
            this.setCountCart()
            this.setCartTotalPrice()
        },
    },
    computed: {
        image() {
          const baseUrl = process.env.BASE_URL || 'http://localhost:8080/'
          return baseUrl + this.product.image
        },
        price() {
            return convertRupiah(this.product.price)
        }
    }
}
</script>

<style scoped>
    .right-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 2.5rem;
    }
    .count-delete {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .product-count {
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
    .count {
        width: 20px;
        text-align: center;
        margin: 0 5px;
    }
</style>