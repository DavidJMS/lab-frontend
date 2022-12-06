import {
  Text,
  HStack,
  Input,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Select,
  Button,
  Image
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Link } from '@chakra-ui/react'
import iconDelete from '../../assets/Delete.svg'
import SearchIcon from '../../assets/SearchClient.svg'
import IconEdit from '../../assets/Edit.svg'

const LayoutClient = ({ data, handleDelete }) => {
  const title = 'Modal Cliente'
  const navigate = useNavigate()

  return (
    <Box>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
        <Box>
          <HStack w='100%' padding={4}>
            <Text>Cedula :</Text>
            <Input placeholder='Texto' w='auto' />
            <Image height='2rem' src={SearchIcon} />
          </HStack>
        </Box>
        <Table variant='simple' width='100%' m={4}>
          <Thead bg='#F4F7FF'>
            <Tr>
              <Th w='42%'>Nombres y Apellidos</Th>
              <Th>Cedula</Th>
              <Th>Nmro de telefono</Th>
              <Th>Eliminar</Th>
              <Th>Editar</Th>
            </Tr>
          </Thead>

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
                <Td color='#8E9196' alignItems='center'><Image cursor='pointer' height='1.5rem' onClick={() => handleDelete(client.id)} src={iconDelete}></Image></Td>
                <Td color='#8E9196'><Image onClick={() => navigate(`edit/${client.id}/`)} height='1.5rem' cursor='pointer' src={IconEdit}></Image></Td>
              </Tr>
            ))
            }
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default LayoutClient
