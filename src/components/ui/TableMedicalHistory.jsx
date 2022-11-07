import {
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Input,
  FormControl,
  Box,
  Flex,
  Button,
  Image
} from '@chakra-ui/react'
import SearchIcon from '../../assets/SearchClient.svg'

const TableMedicalHistory = ({ data }) => {
  return (
    <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
      <Flex justifyContent='space-around' w='82%'>
        <HStack mb={4} mt={4}>
          <Text>Cedula</Text>
          <FormControl isReadOnly>
            <Input w='10rem' />
          </FormControl>
          <Text>Fecha</Text>
          <FormControl isReadOnly>
            <Input
              placeholder='Select Date and Time'
              size='md'
              type='datetime-local'
            />
          </FormControl>
          <Image height='2rem' src={SearchIcon} />
        </HStack>

        <HStack mb={4} mt={4} />

        <HStack>
          <Button bgColor='#D0D0D0'>Agregar historial</Button>
        </HStack>

      </Flex>

      <Box width='100%' display='flex' justifyContent='center'>
        <Table variant='simple' width='70%' m={4}>
          <Thead bg='#F4F7FF'>
            <Tr>
              <Th>Nombre y Apellido</Th>
              <Th>Cedula</Th>
              <Th>Fecha</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td><Text color='#8E9196'>Miguel Marabay</Text></Td>
              <Td><Text color='#8E9196'>31894864</Text></Td>
              <Td><Text color='#8E9196'>02/11/2022</Text></Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default TableMedicalHistory
