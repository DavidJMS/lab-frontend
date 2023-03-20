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

const TableFinancials = ({ data }) => {
  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
  return (
    <>
      <Table fontSize={['.8rem', '1rem']} variant='simple' width='90%' m={4}>
        {IsNotSmallScreen &&
          <Thead bg='#F4F7FF'>
            <Tr>
              <Th>Cliente</Th>
              <Th>Bolivares</Th>
              <Th>Dolares</Th>
              <Th>Divisa</Th>
              <Th>Metodo</Th>
              <Th>Ref</Th>
              <Th>Fecha</Th>
              <Th>Tasa</Th>
            </Tr>
          </Thead>}
        <Tbody>
          {data && data.map((payment) => (
            <Tr key={payment.id}>
              <Td><Text color='#8E9196'>{payment?.medical_history?.client?.full_name}</Text></Td>
              <Td color='#8E9196'>{payment.amount_bolivares} bs</Td>
              <Td color='#8E9196'>{payment.amount_dollars} $ </Td>
              <Td color='#8E9196'>{payment.divisa}</Td>
              <Td color='#8E9196'>{payment.method_payment}</Td>
              <Td color='#8E9196'>{payment.number_ref || 'No Aplica'}</Td>
              <Td color='#8E9196'>{payment.create_at}</Td>
              <Td color='#8E9196'>{payment.price?.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

export default TableFinancials
