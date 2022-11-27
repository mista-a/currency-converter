import { getCurrencies } from '~/api'
import { ActionContext } from 'vuex'

interface CurrenciesState {
  currencies: string[]
  fetchingCurrencies: boolean
}

export const state = (): CurrenciesState => ({
  currencies: [],
  fetchingCurrencies: true,
})

export const getters = {
  getCurrencies(state: CurrenciesState) {
    return state.currencies
  },
}

export const mutations = {
  setCurrencies(state: CurrenciesState, currencies: string[]) {
    state.currencies = currencies
    state.fetchingCurrencies = false
  },
}

export const actions = {
  async fetchCurrencies(
    context: ActionContext<CurrenciesState, CurrenciesState>
  ) {
    let currencies = await getCurrencies()
    currencies = Object.keys(currencies).map((currency) => {
      return {
        value: currency,
        name: `${currency} | ${currencies[currency]}`,
      }
    })
    context.commit('setCurrencies', currencies)
  },
}
