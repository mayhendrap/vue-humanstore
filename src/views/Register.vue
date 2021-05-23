<template>
  <v-container>
      <v-row>
          <v-col sm="4" class="mx-auto mt-16">
              <v-card class="pa-5">
                <v-text-field
                    v-model="form.email"
                    placeholder="Email"
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
        ...mapGetters({ error: "getCurrentError" })
    },
    methods: {
        ...mapActions(["registerUserFirebase"]),
        ...mapMutations(["setIsError"]),
        async RegisterUser() {
            const successRegister = await this.registerUserFirebase(this.form)
            if (successRegister) {
                this.form.email = ""
                this.form.password = ""
                this.$router.push('/login')
            }
        },
        handleInputChange() {
            this.setIsError({email: "", password: ""})
        }
    }
}
</script>

<style>

</style>