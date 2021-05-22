<template>
  <v-app>
    <Header :user="user"/>
    <v-main>
      <router-view :user="user"/>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    Header
  },
  data: () => ({
  }),
  methods: {
    ...mapActions(["setProductsFromFirebase"]),
    ...mapMutations(["setUser"])
  },
  computed: {
    ...mapGetters({user: "getCurrentUser"})
  },
  async created() {
    if(localStorage.getItem("user")) {
      const {uid, email, isLogin} = JSON.parse(localStorage.getItem("user"))
      this.setUser({uid, email, isLogin})
    }
  },
  mounted() {
    this.setProductsFromFirebase()
  },
};
</script>

<style scoped>
  .store-name {
    color: rgb(31, 31, 31);
    text-decoration: none;
    font-size: 23px;
  }
  .auth-button {
    color: rgb(31, 31, 31);
    text-decoration: none;
  }
</style>