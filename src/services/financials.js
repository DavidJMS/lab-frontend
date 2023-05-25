import api from './api'

const createTransactions = async (data) => {
  try {
    const res = await api.post('financials/transactions/', data)
    if (res.status === 201) {
      return {
        error: false, ...res.data
      }
    }
  } catch (error) {
    console.log()
    return { error: true }
  }
}

const getTransactions = async (props) => {
  try {
    let url = 'financials/transactions/'
    if (props?.typeFilter === 'dia') {
      url = url + `?create_at__date=${props.date}`
    } else if (props?.typeFilter === 'range') {
      url = url + `?create_at__range=${props.range__start},${props.range__end}`
    }
    const res = await api.get(url)
    return res.data
  } catch {
    console.log()
  }
}

const editTransactions = async (data, id) => {
  try {
    const res = await api.put(`financials/transactions/${id}/`, data)
    if (res.status === 204) return true
    else return false
  } catch {
    console.log()
    return false
  }
}

const deleteTransactions = async (id) => {
  try {
    const res = await api.delete(`financials/transactions/${id}`)
    return { error: false, ...res.data }
  } catch {
    console.log()
    return { error: true }
  }
}

const getTodayTasa = async () => {
  try {
    const res = await api.get('financials/price-dollar/today_tasa/')
    return res.data
  } catch {
    console.log()
  }
}

const getPricesDollar = async () => {
  try {
    const res = await api.get('financials/price-dollar/')
    return res.data
  } catch {
    console.log()
  }
}

const createPriceDollar = async (data) => {
  try {
    const res = await api.post('financials/price-dollar/', data)
    return res
  } catch {
    console.log()
  }
}

const getCashFlow = async () => {
  try {
    const res = await api.get('financials/cash-flow/get_cash_flow/')
    return res.data
  } catch {
    console.log()
  }
}

const getCashFlows = async () => {
  try {
    const res = await api.get('financials/cash-flow/')
    return res.data
  } catch {
    console.log()
  }
}

const desactivateCashFlows = async (data) => {
  try {
    const res = await api.post('financials/cash-flow/desactivate/', data)
    return res.data
  } catch {
    console.log()
  }
}

const createPriceTransaction = async (data) => {
  try {
    const res = await api.post('financials/price-transaction/', data)
    return res.data
  } catch {
    console.log()
  }
}

const deletePriceTransaction = async (id) => {
  try {
    const res = await api.delete(`financials/price-transaction/${id}/`)
    return { error: false, ...res.data }
  } catch {
    console.log()
    return { error: true }
  }
}

const getPriceTransactions = async (id) => {
  try {
    const res = await api.get(`financials/price-transaction/${id}/medical/`)
    return res.data
  } catch {
    console.log()
  }
}

export {
  getTransactions,
  createTransactions,
  deleteTransactions,
  editTransactions,
  getPricesDollar,
  getTodayTasa,
  createPriceDollar,
  getCashFlow,
  getCashFlows,
  desactivateCashFlows,
  createPriceTransaction,
  deletePriceTransaction,
  getPriceTransactions
}
