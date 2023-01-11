import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import ClientForm from '../components/ui/ClientForm'
import { getClient } from '../services/clients'
import { useParams } from 'react-router-dom'
import Spinner from '../components/components/Spinner'

const EditClient = () => {
  const [client, setClient] = useState(undefined)
  const { clientId } = useParams()

  useEffect(() => {
    handleGetClient()
  }, [])

  const handleGetClient = async () => {
    const res = await getClient(clientId)
    if (res) {
      setClient(res)
    }
  }

  if (!client) return <Spinner />

  return (
    <Box width='100%'>
      <Box mb={4} width='100%'>
        <ClientForm client={client} />
      </Box>
    </Box>
  )
}

export default EditClient
