<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-btn to="/" nuxt rounded>converter</v-btn>
      <v-btn to="currencies" nuxt rounded>currencies</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      fetchCurrencies: 'currencies/fetchCurrencies',
    }),
  },
  created() {
    this.fetchCurrencies()
  },
}
</script>
