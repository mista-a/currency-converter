<template>
  <div>
    <v-text-field
      filled
      @input="$emit('onchangecurrencyamount', $event)"
      @keypress="isNumber($event)"
      :value="currencyAmount"
      :disabled="fetchingValue"
    />
    <v-autocomplete
      :items="currencies"
      item-text="name"
      item-value="value"
      outlined
      :value="currency"
      @input="$emit('onchangecurrency', $event)"
      :loading="fetchingCurrencies"
      :disabled="fetchingValue"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'CurrencyExchange',
  props: {
    currencyAmount: Number,
    currency: String,
    currencies: Array,
    fetchingValue: Boolean,
  },
  computed: {
    fetchingCurrencies() {
      return this.$store.state.currencies.fetchingCurrencies
    },
  },
  methods: {
    isNumber(event: KeyboardEvent) {
      const keysAllowed = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
      const keyPressed = event.key

      if (!keysAllowed.includes(keyPressed)) {
        event.preventDefault()
      } else {
        return true
      }
    },
  },
}
</script>
