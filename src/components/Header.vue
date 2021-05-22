<template>
  <v-app-bar
      app
      color="white"
      elevation="1"
    >
      <v-toolbar-title>
        <router-link to="/" class="store-name">
          Humanstore
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="user == null">
        <router-link to="/login" class="auth-button">
          <v-btn
            outlined
          >
            Masuk
          </v-btn>
        </router-link>
        <router-link to="/register" class="auth-button">
          <v-btn
            outlined
            class="ml-3"
          >
              Daftar
          </v-btn>
        </router-link>
      </template>
      <template v-else>
          <router-link to="/cart" class="count-cart">
            <v-btn icon>
              <span>{{ productsQty }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#1f1f1f"><g><rect fill="none" height="24" width="24"/><path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"/></g></svg>
            </v-btn>
          </router-link>
          <v-menu
          left
          nudge-bottom="30"
          elevation="0"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon>
                <svg v-bind="attrs" v-on="on" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1f1f1f"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"/></svg>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>{{ user.email }}</v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="() => {}"
              >
                <v-list-item-title @click="logout">Keluar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
    </v-app-bar>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  props: ["user"],
  methods: {
    ...mapMutations(["setUser"]),
    logout() {
      localStorage.removeItem('user')
      this.setUser(null)
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters({productsQty: "getCurrentProductsQty"})
  }
}
</script>

<style scoped>
  .store-name {
    color: #1f1f1f;
    text-decoration: none;
    font-size: 23px;
  }
  .auth-button {
    color: #1f1f1f;
    text-decoration: none;
  }
  .count-cart {
    text-decoration: none;
  }
</style>