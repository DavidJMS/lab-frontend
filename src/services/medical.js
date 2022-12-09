import api from './api'

const getMedicalHistories = async () => {
  try {
    const res = await api.get('medical/history-client/')
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
