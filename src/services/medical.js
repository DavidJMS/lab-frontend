import api from './api'

const getMedicalHistories = async (props) => {
  try {
    let url = 'medical/history-client/'
    if (props?.dni) {
      url = url + `?client__dni=${props.dni}`
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
    return res.data
  } catch (error) {
    console.log()
  }
}

export {
  getMedicalHistories,
  createMedical
}
