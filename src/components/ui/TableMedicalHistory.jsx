import {
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useMediaQuery,
  Image
} from '@chakra-ui/react'
import editIcon from '../../assets/Edit.svg'

const TableMedicalHistory = ({ data, navigate }) => {
  const fecha = data[0].create_at
  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
  return (
    <Table fontSize={['.8rem', '1rem']} variant='simple' width='70%' m={4}>
      {IsNotSmallScreen &&
        <Thead bg='#F4F7FF'>
          <Tr>
            <Th>Nombre y Apellido</Th>
            <Th>Cedula</Th>
            <Th>Fecha</Th>
            <Th>Editar</Th>
          </Tr>
        </Thead>}
      <Tbody>
        {data && data.map((medical, index) => {
          return (
            <Tr key={index}>
              <Td><Text color='#8E9196'>{medical?.client?.full_name}</Text></Td>
              <Td><Text color='#8E9196'>{medical?.client?.dni}</Text></Td>
              <Td><Text color='#8E9196'>{medical?.create_at}</Text></Td>
              <Td color='#8E9196'>
                <Image onClick={() => navigate(`editar-historia-${medical?.id}`)} w={['.5rem', '1.5rem']} cursor='pointer' src={editIcon} alt='editar' />
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default TableMedicalHistory
