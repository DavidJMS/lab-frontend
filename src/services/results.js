import api from './api'

const createResult = async (data) => {
  try {
    await api.post('medical/results/', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return true
  } catch (error) {
    return false
  }
}

const getResults = () => {
  try {
    const res = api.get('medical/results/')
    return res.data
  } catch {
    console.log()
  }
}

const getResultByCode = async (data) => {
  try {
    const res = await api.post('medical/results/get_results_by_code/', data)
    return { data: res.data, error: false }
  } catch (res) {
    return { message: res?.response?.data?.non_field_errors ? res?.response?.data?.non_field_errors[0] : 'Hubo un error', error: true }
  }
}
const deleteResult = async (id) => {
  try {
    await api.delete(`medical/results/${id}/`)
    return true
  } catch {
    return false
  }
}

export {
  getResults,
  createResult,
  deleteResult,
  getResultByCode
}
