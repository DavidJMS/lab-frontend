import api from './api'

const createClient = async (data) => {
  try {
    await api.post('client/', data)
    return true
  } catch (error) {
    return false
  }
}

const getClients = async (props) => {
  try {
    let url = 'client/'
    if (props?.linkPagination) {
      url = props.linkPagination
    } else {
      if (props?.dni) {
        url = url + `?dni=${props.dni}`
      }
    }
    const res = await api.get(url)
    return res.data
  } catch {
    console.log()
  }
}

const getClient = async (id) => {
  try {
    const res = await api.get(`client/${id}`)
    return res.data
  } catch {
    console.log()
  }
}
const editClient = (data, id) => {
  try {
    const res = api.put(`client/${id}/`, data)
    return res
  } catch {
    console.log()
  }
}

const deleteClient = (id) => {
  try {
    const res = api.delete(`client/${id}`)
    return res
  } catch {
    console.log()
    return { error: false }
  }
}

export {
  createClient,
  getClients,
  getClient,
  deleteClient,
  editClient
}
