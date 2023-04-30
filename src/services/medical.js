import api from './api'

const getMedical = async (id) => {
  try {
    const res = await api.get(`medical/history-client/${id}`)
    return res.data
  } catch {
    console.log()
  }
}

const putMedical = async (id, data) => {
  try {
    const res = await api.patch(`medical/history-client/${id}/`, data)
    return { error: false, ...res.data }
  } catch {
    return { error: true }
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
      if (props?.number_id) {
        url = url + `?number_id=${props.number_id}`
      }
      if (props?.with_samples !== undefined && props?.with_samples !== 'ninguno') {
        url = url + `?with_samples=${props.with_samples}`
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
    const res = await api.post('medical/history-client/', data)
    return { error: true, ...res.data }
  } catch (error) {
    return { error: false }
  }
}

const EditMedicalHistory = async (id, data) => {
  try {
    const res = await api.put(`medical/history-client/${id}/`, data)
    return { error: true, ...res.data }
  } catch (error) {
    return { error: false }
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
  putMedical,
  createMedical,
  EditMedicalHistory,
  getPaymentsMedical,
  getMedical,
  getResultsMedical
}
