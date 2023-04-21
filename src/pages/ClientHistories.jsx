import React, { useEffect, useState } from 'react'
import LayoutClient from '../components/Layouts/LayoutClient'
import { Box, useToast } from '@chakra-ui/react'
import SpinnerLayout from '../components/components/Spinner'

// Services
import { getClients, deleteClient } from '../services/clients'
const ClientHistories = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const toast = useToast()

  const [linkPagination, setlinkPagination] = useState(undefined)
  const [nextPagination, setNextPagination] = useState(null)
  const [previousPagination, setpreviousPagination] = useState(null)

  useEffect(() => {
    getData()
  }, [linkPagination])

  const getData = async (params = undefined) => {
    try {
      setLoading(true)
      const data = params === undefined ? await getClients({ linkPagination }) : await getClients({ linkPagination: undefined, ...params })
      setData(data?.results)
      setNextPagination(data?.next)
      setpreviousPagination(data?.previous)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteClient(id)
      setData(data.filter(e => e.id !== id))
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

  const setNumberPaginationLogic = (number) => {
    if (!previousPagination && number === -1) return
    if (!nextPagination && number === 1) return
    if (number === -1) setlinkPagination(previousPagination)
    else setlinkPagination(nextPagination)
  }

  if (loading) {
    return (
      <SpinnerLayout />
    )
  }
  return (
    <Box>
      <LayoutClient
        data={data}
        handleDelete={handleDelete}
        getData={getData}
        setNumberPagination={setNumberPaginationLogic}
      />
    </Box>
  )
}

export default ClientHistories
