import api from './api'

const getMedicalHistories = () => {
  try {
    const res = api.get('medical/history-client/')
    return res.data
  } catch {
    console.log()
  }
}

export {
  getMedicalHistories
}
