import React from 'react'
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  useMediaQuery
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import iconDelete from '../../assets/Delete.svg'
import IconEdit from '../../assets/Edit.svg'

const TableClient = ({ data, handleDelete }) => {
  const navigate = useNavigate()

  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')

  return (
    <Table fontSize={['.8rem', '1rem']} variant='simple' width='80%' m={4}>
      {IsNotSmallScreen &&
        <Thead bg='#F4F7FF'>
          <Tr>
            <Th>Nombres</Th>
            <Th>Apellidos</Th>
            <Th>Cédula</Th>
            <Th>Teléfono</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>}
      <Tbody>
        {data.map((client) => (
          <Tr
          paddingInlineEnd={'0'}
          paddingEnd={'0'}
            key={client.id}
            _hover={{
              background: 'gray.50'
            }}
          >
            <Td paddingInlineEnd={'0'} paddingStart={'0.5rem'} paddingEnd={'0.5rem'} color='#8E9196'>{client.first_names}</Td>
            <Td paddingInlineEnd={'0'} paddingStart={'0.5rem'} paddingEnd={'0.5rem'} color='#8E9196'>{client.last_names}</Td>
            <Td paddingInlineEnd={'0'} paddingStart={'0.5rem'} paddingEnd={'0.5rem'} color='#8E9196'>{client.dni}</Td>
            <Td paddingInlineEnd={'0'} paddingStart={'0.5rem'} paddingEnd={'0.5rem'} color='#8E9196' alignItems='center' display='flex'>
              <Image m='0 10px' cursor='pointer' w={['.5rem', '.7rem', '1rem', '1.5rem']} onClick={() => handleDelete(client.id)} src={iconDelete} />
              <Image m='0 10px' onClick={() => navigate(`/editar-cliente-${client.id}`)} w={['.5rem', '1.5rem']} cursor='pointer' src={IconEdit} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default TableClient
