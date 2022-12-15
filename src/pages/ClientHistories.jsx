import React, { useEffect, useState } from 'react'
import LayoutClient from '../components/Layouts/LayoutClient'
import { Box, useToast } from '@chakra-ui/react'

// Services
import { getClient, deleteClient } from '../services/clients'
import { useRouteLoaderData } from 'react-router-dom'
import Header from '../components/Layouts/Header'

const ClientHistories = () => {
  const [data, setData] = useState([])
  const toast = useToast()
  const title = 'Clientes'
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

  return (
    <>
      <Box>
      <LayoutClient data={data} handleDelete={handleDelete} />
      </Box>
    </>
  )
}

export default ClientHistories
