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
  } from "@chakra-ui/react";
  import Header from "./Header";
  import SearchIcon from '../../assets/SearchClient.svg'

  
  const LayoutClient = () => {
    const title = 'Modal Cliente'
    return (
     <Box >
       <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
        <Box>
          <HStack>
              <Text>Cedula :</Text>
              <Input placeholder="Texto" w='auto' />
              <Image height='2rem' src={SearchIcon} />
          </HStack>
        </Box>
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
                <Td><Text color={'#8E9196'}>Miguel Marabay</Text></Td>
                <Td><Text color={'#8E9196'}>31894864</Text></Td>
                <Td><Text color={'#8E9196'}>02/11/2022</Text></Td>
              </Tr>
              <Tr>
                <Td><Text color={'#8E9196'}>Miguel Marabay</Text></Td>
                <Td><Text color={'#8E9196'}>31894864</Text></Td>
                <Td><Text color={'#8E9196'}>02/11/2022</Text></Td>
              </Tr><Tr>
                <Td><Text color={'#8E9196'}>Miguel Marabay</Text></Td>
                <Td><Text color={'#8E9196'}>31894864</Text></Td>
                <Td><Text color={'#8E9196'}>02/11/2022</Text></Td>
              </Tr><Tr>
                <Td><Text color={'#8E9196'}>Miguel Marabay</Text></Td>
                <Td><Text color={'#8E9196'}>31894864</Text></Td>
                <Td><Text color={'#8E9196'}>02/11/2022</Text></Td>
              </Tr><Tr>
                <Td><Text color={'#8E9196'}>Miguel Marabay</Text></Td>
                <Td><Text color={'#8E9196'}>31894864</Text></Td>
                <Td><Text color={'#8E9196'}>02/11/2022</Text></Td>
              </Tr>
          </Tbody>
        </Table>
       </Box>
     </Box>
    )
  }
  
  export default LayoutClient