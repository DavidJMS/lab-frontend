import api from './api'

const getMedical = async (id) => {
  try {
    const res = await api.get(`medical/history-client/${id}`)
    return res.data
  } catch {
    console.log()
  }
}
const getMedicalHistories = async (props) => {
  try {
    let url = 'medical/history-client/'
    if (props?.linkPagination) {
      url = props.linkPagination
    } else {
      if (props?.dni) {
        url = url + `?client__dni=${props.dni}`
      }
      if (props?.date) {
        url = url + `?create_at__date=${props.date}`
      }
    }
    const res = await api.get(url)
    return res.data
  } catch {
    console.log()
  }
}

const createMedical = async (data) => {
  try {
    await api.post('medical/history-client/', data)
    return true
  } catch (error) {
    return false
  }
}

const getPaymentsMedical = async (id) => {
  try {
    const res = await api.get(`medical/history-client/${id}/get_payments/`)
    return res.data
  } catch {
    console.log()
  }
}

const getResultsMedical = async (id) => {
  try {
    const res = await api.get(`medical/history-client/${id}/get_results/`)
    return res.data
  } catch {
    console.log()
  }
}

export {
  getMedicalHistories,
  createMedical,
  getPaymentsMedical,
  getMedical,
  getResultsMedical
}
