import React, {useState, useEffect} from 'react'
import LayoutClient from '../Layouts/LayoutClient'
import {
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, useMediaQuery
} from '@chakra-ui/react'
import { getClient, deleteClient } from '../../services/clients'


import iconDelete from '../../assets/Delete.svg'
import SearchIcon from '../../assets/SearchClient.svg'
import IconEdit from '../../assets/Edit.svg'

import { useToast, Box,
  Text,
  HStack,
  Input,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import FormsMedical from '../ui/FormsMedical'

const ModalClient = ({setUserData}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState([])
  const toast = useToast()
  const [size, setSize] = React.useState('full')

  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')


  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  const passData = (client) => {
    console.log(client)
    setUserData(client)
  }

  
  
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

  const sizes = [ 'full']

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
          <ModalHeader bgColor='#0DA7D9' height='1rem' color='#F5F5F5' textAlign='center' w='100%'>Modal Title</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody w='100%' >
          <Box>
          <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
            <Box>
              <HStack w='100%' padding={4}>
                <Text fontSize={['.9rem', '1rem']}>Cedula :</Text>
                <Input placeholder='Texto' w={['50%','auto']} />
                <Image height='2rem' w={['3.5rem','auto']}  src={SearchIcon} />
              </HStack>
            </Box>
            <Table variant='simple' width='100%' m={4}>
             {IsNotSmallScreen ? 
              <Thead bg='#F4F7FF'>
              <Tr>
                <Th fontSize={['.5rem', '1rem']}>Nombres y Apellidos</Th>
                <Th fontSize={['.5rem', '1rem']}>Cedula</Th>
                <Th fontSize={['.5rem', '1rem']}>Nmro de telefono</Th>
                <Th fontSize={['.5rem', '1rem']}>Escoger</Th>
              </Tr>
              </Thead> :
              <Thead bg='#F4F7FF'>
              <Tr>
                <Th fontSize={['.9rem', '1rem']}>Nombres y Apellidos</Th>
                <Th fontSize={['.9rem', '1rem']}>Cedula</Th>
              </Tr>
              </Thead>
             }

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
                ))
                }
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
