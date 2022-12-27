import api from './api'

const createExam = async (data) => {
	try {
		 await api.post('medical/exams/', data)
		return true
		} catch (error) {
			return false
	}	
}

const getExams = () => {
	try {
	  const res = api.get('medical/exams/')
	  return res
	} catch {
	  console.log()
	}
}

const editExam = (data, id) => {
	try {
	  const res = api.put(`medical/exams/${id}/`, data)
	  return res
	} catch {
	  console.log()
	}
}

const deleteExams = (id) => {
	try {
	  const res = api.delete(`medical/exams/${id}`)
	  return res
	} catch {
	  console.log()
	}
}


export {
	getExams,
    createExam,
	deleteExams,
	editExam
}