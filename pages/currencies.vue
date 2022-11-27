<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-autocomplete
      :items="currencies"
      item-text="name"
      item-value="value"
      outlined
      v-model="currency"
      :disabled="latestCurrenciesFetching"
    />
    <v-progress-circular v-if="latestCurrenciesFetching" indeterminate />
    <v-row v-else>
      <v-col
        v-for="(value, currency) in latestCurrencies"
        md="3"
        align="center"
        :key="currency"
      >
        <v-card class="pa-3"> {{ currency }} | {{ value }} </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { getLatestCurrencies } from '~/api'

interface CurrenciesData {
  currency: string
  latestCurrencies: string[]
  latestCurrenciesFetching: boolean
}

export default {
  name: 'CurrenciesPage',
  data(): CurrenciesData {
    return {
      currency: 'USD',
      latestCurrencies: [],
      latestCurrenciesFetching: true,
    }
  },
  computed: {
    currencies() {
      return this.$store.state.currencies.currencies
    },
  },
  watch: {
    currency() {
      this.fetchLatestCurrencies()
    },
  },
  created() {
    this.fetchLatestCurrencies()
  },
  methods: {
    async fetchLatestCurrencies() {
      this.latestCurrenciesFetching = true
      this.latestCurrencies = await getLatestCurrencies(this.currency)
      this.latestCurrenciesFetching = false
    },
  },
}
</script>
