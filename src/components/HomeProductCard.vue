<template>
    <router-link :to="`/detail/${product.id - 1}`" class="card-link">
        <v-card
            elevation="1"
        >
            <v-img
            height="200"
            :src="image"
        ></v-img>
            <v-card-subtitle>{{ product.category }}</v-card-subtitle>
            <v-card-title>{{ product.title }}</v-card-title>
            <v-card-text>{{ price }}</v-card-text>
        </v-card>
    </router-link>
</template>

<script>
import convertRupiah from '../utils/convertRupiah.js'

export default {
    props: {
        product: Object
    },
    computed: {
        image() {
            const baseUrl = process.env.BASE_URL || 'http://localhost:8080/'
            return baseUrl + this.product.image
        },
        price() {
            return convertRupiah(this.product.price)
        }
    },
    data: () => ({
    })
}
</script>

<style scoped>
    .card-link {
        text-decoration: none;
    }
</style>