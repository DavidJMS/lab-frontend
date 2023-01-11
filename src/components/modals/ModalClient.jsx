import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import {
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, useMediaQuery
  , useToast, Box,
  Text,
  HStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image
} from '@chakra-ui/react'
import { getClients, deleteClient } from '../../services/clients'
import * as Yup from 'yup'
import SearchIcon from '../../assets/SearchClient.svg'
import { Field } from '../../components/shared/FormFields'
import ClientFilter from '../components/ClientFilter'

const ModalClient = ({ setUserData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState([])
  const toast = useToast()
  const [size, setSize] = React.useState('full')
  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')

  const validationSchema = Yup.object({
    dni: Yup.string()
      .max(15, 'El maximo de caracteres es de 15')
  })

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  const passData = (client) => {
    setUserData(client)
  }

  const getData = async (params = undefined) => {
    try {
      const data = params === undefined ? await getClients() : await getClients(params)
      setData(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

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

  const sizes = ['full']

  return (
    <>
      <Button
        bgColor='#D0D0D0'
        mr={8}
        onClick={() => handleSizeClick(size)}
      >
        Clientes
      </Button>

      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='1rem' color='#F5F5F5' textAlign='center' w='100%'>Clientes</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody w='100%'>
            <Box>
              <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
                <Box>
                  <ClientFilter />
                </Box>
                <Table variant='simple' width='100%' m={4}>
                  {IsNotSmallScreen
                    ? <Thead bg='#F4F7FF'>
                      <Tr>
                        <Th fontSize={['.5rem', '1rem']}>Nombres y Apellidos</Th>
                        <Th fontSize={['.5rem', '1rem']}>Cedula</Th>
                        <Th fontSize={['.5rem', '1rem']}>Nmro de telefono</Th>
                        <Th fontSize={['.5rem', '1rem']}>Escoger</Th>
                      </Tr>
                    </Thead>
                    : <Thead bg='#F4F7FF'>
                      <Tr>
                        <Th fontSize={['.9rem', '1rem']}>Nombres y Apellidos</Th>
                        <Th fontSize={['.9rem', '1rem']}>Cedula</Th>
                      </Tr>
                    </Thead>}

                  <Tbody>
                    {data.map((client) => (
                      <Tr
                        key={client.id}
                        _hover={{
                          background: 'gray.50'
                        }}
                      >
                        <Td color='#8E9196'>{client.first_names} {client.last_names}</Td>
                        <Td color='#8E9196'>{client.dni}</Td>
                        <Td color='#8E9196'>{client.phone}</Td>
                        <Td color='#8E9196' onClick={() => [passData(client), onClose()]}>Elegir</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalClient
