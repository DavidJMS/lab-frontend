import React, { useEffect, useState } from 'react'
import LayoutClient from '../components/Layouts/LayoutClient'
import { Box, useToast } from '@chakra-ui/react'
import SpinnerLayout from '../components/components/Spinner'

// Services
import { getClient, deleteClient } from '../services/clients'
const ClientHistories = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const toast = useToast()

  useEffect(() => {
    getData()
  }, [])

  const getData = async (params = undefined) => {
    try {
      setLoading(true)
      const data = params === undefined ? await getClient() : await getClient(params)
      setData(data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
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

  if (loading) {
    return (
      <SpinnerLayout />
    )
  }
  return (
    <Box>
      <LayoutClient data={data} handleDelete={handleDelete} getData={getData} />
    </Box>
  )
}

export default ClientHistories
