import api from './api'

const getMedicalHistories = async () => {
  try {
    const res = await api.get('medical/history-client/')
    return res.data
  } catch {
    console.log()
  }
}

export {
  getMedicalHistories
}
