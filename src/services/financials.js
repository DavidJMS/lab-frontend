import api from './api'

const createFinancials = async (data) => {
  try {
    const res = await api.post('medical/financials/', data)
    if (res.status === 201) return true
  } catch (error) {
    console.log()
    return false
  }
}

const getFinancials = (props) => {
  try {
    let url = 'medical/financials/'
    if (props?.date) {
      url = url + `?payment_date__date=${props.date}`
    }
    const res = api.get(url)
    return res
  } catch {
    console.log()
  }
}

const editFinancials = (data, id) => {
  try {
    const res = api.put(`medical/financials/${id}/`, data)
    if (res.status === 204) return true
    else return false
  } catch {
    console.log()
    return false
  }
}

const deleteFinancials = (id) => {
  try {
    const res = api.delete(`medical/financials/${id}`)
    return res
  } catch {
    console.log()
  }
}

export {
  getFinancials,
  createFinancials,
  deleteFinancials,
  editFinancials
}
