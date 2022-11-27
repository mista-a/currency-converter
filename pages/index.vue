<template>
  <v-row align="center" class="justify-center">
    <v-col lg="4">
      <currency-exchange
        :currency="exchanges.leftExchange.currency"
        :currencyAmount="exchanges.leftExchange.value"
        :currencies="currencies"
        :fetchingValue="fetchingValue"
        @onchangecurrency="(value) => changeCurrency('leftExchange', value)"
        @onchangecurrencyamount="
          (value) => changeCurrencyAmount('leftExchange', value)
        "
      />
    </v-col>
    <v-col align="center" lg="auto">
      <v-btn @click="swapCurrency">
        <v-icon>mdi-swap-horizontal</v-icon>
      </v-btn>
    </v-col>
    <v-col lg="4">
      <currency-exchange
        :currency="exchanges.rightExchange.currency"
        :currencyAmount="exchanges.rightExchange.value"
        :currencies="currencies"
        :fetchingValue="fetchingValue"
        @onchangecurrency="(value) => changeCurrency('rightExchange', value)"
        @onchangecurrencyamount="
          (value) => changeCurrencyAmount('rightExchange', value)
        "
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import CurrencyExchange from '~/components/CurrencyExchange.vue'
import { convert } from '~/api/index'

type ExchangeType = {
  value: number
  currency: string
}

type ExchangesType = {
  leftExchange: ExchangeType
  rightExchange: ExchangeType
}

interface IndexData {
  exchanges: ExchangesType
  fetchingValue: boolean
}

export default {
  name: 'IndexPage',
  components: {
    CurrencyExchange,
  },
  data(): IndexData {
    return {
      exchanges: {
        leftExchange: {
          value: 1,
          currency: 'USD',
        },
        rightExchange: {
          value: 1,
          currency: 'USD',
        },
      },
      fetchingValue: false,
    }
  },
  computed: {
    currencies() {
      return this.$store.state.currencies.currencies
    },
  },
  methods: {
    async swapCurrency() {
      //prettier-ignore
      [this.exchanges.leftExchange.currency, this.exchanges.rightExchange.currency]
      = 
      [this.exchanges.rightExchange.currency, this.exchanges.leftExchange.currency]

      const { leftExchange, rightExchange } = this.exchanges

      if (
        this.exchanges.leftExchange.value &&
        this.exchanges.rightExchange.value
      ) {
        this.exchanges.leftExchange.value = await convert({
          from: leftExchange.currency,
          to: rightExchange.currency,
          amount: this.exchanges.leftExchange.value,
        })
      }
    },
    async changeCurrencyAmount(data: keyof ExchangesType, value: number) {
      this.exchanges[data].value = +value
      if (+value === 0) {
        this.exchanges.leftExchange.value = 0
        this.exchanges.rightExchange.value = 0
      } else {
        const { leftExchange, rightExchange } = this.exchanges
        this.fetchingValue = true

        if (data === 'leftExchange') {
          this.exchanges.rightExchange.value = await convert({
            from: leftExchange.currency,
            to: rightExchange.currency,
            amount: value,
          })
        } else {
          this.exchanges.leftExchange.value = await convert({
            from: rightExchange.currency,
            to: leftExchange.currency,
            amount: value,
          })
        }
        this.fetchingValue = false
      }
    },
    async changeCurrency(data: keyof ExchangesType, currency: string) {
      this.exchanges[data].currency = currency
      const { leftExchange, rightExchange } = this.exchanges
      this.fetchingValue = true

      if (data === 'leftExchange') {
        this.exchanges.rightExchange.value = await convert({
          from: rightExchange.currency,
          to: currency,
          amount: leftExchange.value,
        })
      } else {
        this.exchanges.leftExchange.value = await convert({
          from: leftExchange.currency,
          to: currency,
          amount: rightExchange.value,
        })
      }
      this.fetchingValue = false
    },
  },
}
</script>
