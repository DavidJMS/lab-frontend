import {
    Text,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    useMediaQuery
  } from '@chakra-ui/react'
  
  const TableFinancials = ({ data }) => {
    const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
    return (
      <Table fontSize={['.8rem', '1rem']} variant='simple' width='70%' m={4}>
        {IsNotSmallScreen &&
          <Thead bg='#F4F7FF'>
            <Tr>
              <Th>Cliente</Th>
              <Th>Monto Registrado</Th>
              <Th>Fecha</Th>
            </Tr>
          </Thead>}
        <Tbody>
              <Tr>
                <Td><Text color='#8E9196'>David Julian</Text></Td>
                <Td><Text color='#8E9196'>100</Text></Td>
                <Td><Text color='#8E9196'>22/11/22</Text></Td>
              </Tr>
        </Tbody>
      </Table>
    )
  }
  
  export default TableFinancials
  