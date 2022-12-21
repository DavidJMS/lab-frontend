import api from './api'
import { useToast } from '@chakra-ui/react'

const createClient = async (data) => {

  try {
    const res = await api.post('client/', data)
    
    return res.data
  } catch (error) {
   console.log(error)
  }
}

const getClient = (props) => {
  try {
    let url = 'client/'
    if (props?.dni) {
      url = url + `?dni=${props.dni}`
    }
    const res = api.get(url)
    return res
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
  }
}

export {
  createClient,
  getClient,
  deleteClient,
  editClient
}
