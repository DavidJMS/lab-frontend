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
import Header from './Header'
import SearchIcon from '../../assets/SearchClient.svg'

const LayoutClient = () => {
  const title = 'Modal Cliente'
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
              <Th>Nombres y Apellidos</Th>
              <Th>Cedula</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td><Text color='#8E9196'>Miguel Jesus Marabay Salazar</Text></Td>
              <Td><Text color='#8E9196'>31894864</Text></Td>
            </Tr>
            <Tr>
              <Td><Text color='#8E9196'>David Jesus Marabay Salazar</Text></Td>
              <Td><Text color='#8E9196'>27113327</Text></Td>
            </Tr>
            <Tr>
              <Td><Text color='#8E9196'>Maria Mercedes Fuentes Fernandez</Text></Td>
              <Td><Text color='#8E9196'>26361105</Text></Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default LayoutClient
