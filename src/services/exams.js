import api from './api'

const createExam = async (data) => {
  try {
    await api.post('medical/exams/', data)
    return true
  } catch (error) {
    return false
  }
}

const getExams = (props) => {
  try {
    let url = 'medical/exams/'
    if (props?.name) {
      url = url + `?name=${props.name}`
    }
    const res = api.get(url)
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

const deleteExams = async (id) => {
  try {
    await api.delete(`medical/exams/${id}`)
    return true
  } catch {
    return false
  }
}

export {
  getExams,
  createExam,
  deleteExams,
  editExam
}
