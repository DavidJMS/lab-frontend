import api from './api'

const createPayments = async (data) => {
  try {
    const res = await api.post('financials/payments/', data)
    if (res.status === 201) return true
  } catch (error) {
    console.log()
    return false
  }
}

const getPayments = async (props) => {
  try {
    let url = 'financials/payments/'
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

const editPayments = (data, id) => {
  try {
    const res = api.put(`financials/payments/${id}/`, data)
    if (res.status === 204) return true
    else return false
  } catch {
    console.log()
    return false
  }
}

const deletePayments = (id) => {
  try {
    const res = api.delete(`financials/payments/${id}`)
    return res
  } catch {
    console.log()
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
    console.log(data)
    const res = await api.post('financials/cash-flow/desactivate/', data)
    return res.data
  } catch {
    console.log()
  }
}
export {
  getPayments,
  createPayments,
  deletePayments,
  editPayments,
  getPricesDollar,
  getTodayTasa,
  createPriceDollar,
  getCashFlow,
  getCashFlows,
  desactivateCashFlows
}
