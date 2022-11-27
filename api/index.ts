import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: '9xVA7UMUgwnWAAnLz4LekQUo6bzItpvX' },
  params: { format: 'json' },
})

export async function getCurrencies() {
  const { data } = await instance.get('symbols')
  return data.symbols
}

type ConvertParams = { from: string; to: string; amount: number }
export async function convert({ from, to, amount }: ConvertParams) {
  const { data } = await instance.get(
    `convert?to=${to}&from=${from}&amount=${amount}`
  )
  return data.result
}

export async function getLatestCurrencies(currency: string) {
  const { data } = await instance.get(`latest?base=${currency}`)
  return data.rates
}
