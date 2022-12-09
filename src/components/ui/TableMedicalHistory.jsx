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

const TableMedicalHistory = ({ data }) => {
  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
  return (
    <Table fontSize={['.8rem', '1rem']} variant='simple' width='70%' m={4}>
      {IsNotSmallScreen &&
        <Thead bg='#F4F7FF'>
          <Tr>
            <Th>Nombre y Apellido</Th>
            <Th>Cedula</Th>
            <Th>Fecha</Th>
          </Tr>
        </Thead>}
      <Tbody>
        {data && data.map((medical, index) => {
          return (
            <Tr key={index}>
              <Td><Text color='#8E9196'>{medical?.client?.full_name}</Text></Td>
              <Td><Text color='#8E9196'>{medical?.client?.dni}</Text></Td>
              <Td><Text color='#8E9196'>{medical?.create_at}</Text></Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default TableMedicalHistory
