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

const getFinancials = () => {
  try {
    const res = api.get('medical/financials/')
    return res
  } catch {
    console.log()
  }
}

const editFinancials = (data, id) => {
  try {
    const res = api.put(`medical/financials/${id}/`, data)
    return res
  } catch {
    console.log()
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
