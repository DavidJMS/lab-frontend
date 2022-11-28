import React, { useEffect, useState } from 'react'
import LayoutClient from '../components/Layouts/LayoutClient'
import { useToast } from '@chakra-ui/react'

// Services
import { getClient, deleteClient } from '../services/clients'
import { useRouteLoaderData } from 'react-router-dom'

const ClientHistories = () => {
    const [data, setData] = useState([])
    const toast = useToast()
    console.log(data)

  useEffect(() => {
    getData()
  }, [])
  
  const getData = async () => {
    try {
      const data = await getClient()
      setData(data.data)
     
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteClient(id)
      location.reload()
      toast({
        title: 'Exito',
        description: 'Cliente eliminado de manera exitosa',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    } catch (error) {
      setLoading(false)
      toast({
        title: 'Error',
        description: 'Hubo en error, intentelo luego.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  return <LayoutClient data={data} handleDelete={handleDelete} />
}

export default ClientHistories
