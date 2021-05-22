<template>
  <v-container>
      <v-row>
          <v-col sm="4" class="mx-auto mt-16">
              <v-card class="pa-5">
                <v-text-field
                    v-model="form.email"
                    placeholder="Email"
                    required
                    :error-messages="error"
                    @keypress="handleInputChange"
                ></v-text-field>
                <v-text-field
                    v-model="form.password"
                    placeholder="Password"
                    type="password"
                    required
                    :error-messages="error"
                    @keypress="handleInputChange"
                ></v-text-field>
                <v-btn
                    block
                    elevation="1"
                    large
                    @click="RegisterUser"
                >
                    Daftar
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
        ...mapGetters({ error: "getCurrentLoginError" })
    },
    methods: {
        ...mapActions(["registerUserFirebase"]),
        ...mapMutations(["setIsLoginError"]),
        async RegisterUser() {
            const successRegister = await this.registerUserFirebase(this.form)
            if (successRegister) {
                this.form.email = ""
                this.form.password = ""
                this.$router.push('/login')
            }
        },
        handleInputChange() {
            this.setIsLoginError('')
        }
    }
}
</script>

<style>

</style>