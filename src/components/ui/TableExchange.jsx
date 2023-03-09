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

const TableExchange = ({ data }) => {
  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
  return (
    <>
      <Table fontSize={['.8rem', '1rem']} variant='simple' width='90%' m={4}>
        {IsNotSmallScreen &&
          <Thead bg='#F4F7FF'>
            <Tr>
              <Th>Precio</Th>
              <Th>Fecha de actualización</Th>
            </Tr>
          </Thead>}
        <Tbody>
          {data && data.map((priceDollar, i) => (
            <Tr key={i}>
              <Td><Text color='#8E9196'>{priceDollar.price}</Text></Td>
              <Td><Text color='#8E9196'>{priceDollar.create_at}</Text></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

export default TableExchange
