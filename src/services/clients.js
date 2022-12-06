import api from './api'

const createClient = async (data) => {
	try {
		const res = await api.post('client/', data)
		return res.data
		} catch (error) {
		console.log()
	}
}

const getClient = () => {
	try {
	  const res = api.get('client/')
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