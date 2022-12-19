import {
    Text,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Flex,
    Box,
    useMediaQuery
  } from '@chakra-ui/react'
import { useEffect } from 'react'
  import { useState } from 'react'
  
  const TableFinancials = ({ data }) => {
    const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
    const [totalPay, setTotalPay] = useState(0)

    console.log(data)

    return (
     <>
      <Table fontSize={['.8rem', '1rem']} variant='simple' width='90%' m={4}>
        {IsNotSmallScreen &&
          <Thead bg='#F4F7FF'>
            <Tr>
              <Th>Cliente</Th>
              <Th>Monto Registrado</Th>
              <Th>Fecha</Th>
            </Tr>
          </Thead>}
        <Tbody>
              { data && data.map((payment) => (
                <Tr>
                <Td><Text color='#8E9196'>{payment.medical_history}</Text></Td>
                <Td><Text color='#8E9196'>{payment.amount}</Text></Td>
                <Td><Text color='#8E9196'>{payment.payment_date}</Text></Td>
              </Tr>
              ))
              }
        </Tbody>
      </Table>
     </>
    )
  }
  
  export default TableFinancials
  