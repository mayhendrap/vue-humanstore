<template>
  <v-container>
      <v-row>
          <v-col sm="4" class="mx-auto mt-16">
              <v-card class="pa-5">
                <v-text-field
                    v-model="form.email"
                    placeholder="Email"
                    type="text"
                    required
                    :error-messages="error.email"
                    @keypress="handleInputChange"
                ></v-text-field>
                <v-text-field
                    v-model="form.password"
                    placeholder="Password"
                    type="password"
                    required
                    :error-messages="error.password"
                    @keypress="handleInputChange"
                ></v-text-field>
                <v-btn
                    v-if="!isLoading"
                    block
                    elevation="1"
                    large
                    @click="LoginUser"
                >
                    Masuk
                </v-btn>
                <v-btn
                    v-else
                    block
                    elevation="1"
                    large
                >
                    ...
                </v-btn>

              </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    data: () => ({
        form: {
            email: '',
            password: ''
        }
    }),
    computed: {
        ...mapGetters({isLoading: "getCurrentIsLoading", error: "getCurrentError", user: "getCurrentUser"}),
    },
    methods: {
        ...mapActions(["loginUserFirebase"]),
        ...mapMutations(["setIsError"]),
        async LoginUser() {
            const successLogin = await this.loginUserFirebase(this.form)
            if (successLogin && this.user != null) {
                this.form.email = ""
                this.form.password = ""
                this.$router.push('/')
            }
        },
        handleInputChange() {
            this.setIsError({email: "", password: ""})
        }
    }
}
</script>

<style scoped>
</style>