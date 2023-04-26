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
import ModalMovements from '../modals/ModalMovements'

const TableFinancials = ({ data }) => {
  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
  return (
    <>
      <Table fontSize={['.8rem', '1rem']} variant='simple' width='90%' m={4}>
        {IsNotSmallScreen &&
          <Thead bg='#F4F7FF'>
            <Tr>
              <Th>Fecha de creacion</Th>
              <Th>Activa</Th>
              <Th>Dolares en Efectivo</Th>
              <Th>Bolivares en efectivo</Th>
              <Th>Bolivares en el banco</Th>
              <Th>Transacciones</Th>
            </Tr>
          </Thead>}
        <Tbody>
          {data && data.map((cashFlow) => (
            <Tr key={cashFlow.id}>
              <Td><Text color='#8E9196'>{cashFlow?.create_at}</Text></Td>
              <Td color='#8E9196'>{cashFlow?.is_active ? 'Si' : 'No'} </Td>
              <Td color='#8E9196'>{cashFlow.amount_dollars_cash} $ </Td>
              <Td color='#8E9196'>{cashFlow.amount_bolivares_cash}</Td>
              <Td color='#8E9196'>{cashFlow.amount_bolivares_bank}</Td>
              <Td><ModalMovements data={cashFlow?.transactions} /></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

export default TableFinancials
