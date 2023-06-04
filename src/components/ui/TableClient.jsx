import React from 'react'
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import iconDelete from '../../assets/Delete.svg'
import IconEdit from '../../assets/Edit.svg'

const TableClient = ({ data, handleDelete }) => {
  const navigate = useNavigate()
  return (
    <Table
      fontSize={['.8rem', '1rem']}
      variant='simple'
      my={4}
    >
      <Thead bg='#F4F7FF'>
        <Tr>
          <Th>Nombres</Th>
          <Th>Apellidos</Th>
          <Th>Cédula</Th>
          <Th>Teléfono</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((client) => (
          <Tr
            paddingInlineEnd='0'
            paddingEnd='0'
            key={client.id}
            _hover={{
              background: 'gray.50'
            }}
          >
            <Td paddingInlineEnd='0' paddingStart='0.5rem' paddingEnd='0.5rem' color='#8E9196'>{client.first_names || 'No Disponible'}</Td>
            <Td paddingInlineEnd='0' paddingStart='0.5rem' paddingEnd='0.5rem' color='#8E9196'>{client.last_names || 'No Disponible'}</Td>
            <Td paddingInlineEnd='0' paddingStart='0.5rem' paddingEnd='0.5rem' color='#8E9196'>{client.dni || 'No Disponible'}</Td>
            <Td paddingInlineEnd='0' paddingStart='0.5rem' paddingEnd='0.5rem' color='#8E9196'>{client.phone || 'No Disponible'}</Td>
            <Td paddingInlineEnd='0' paddingStart='0.5rem' paddingEnd='0.5rem' color='#8E9196' alignItems='center' display='flex'>
              <Image m='0 10px' height='20px' cursor='pointer' onClick={() => handleDelete(client.id)} src={iconDelete} />
              <Image m='0 10px' height='20px' onClick={() => navigate(`/editar-cliente-${client.id}`)} cursor='pointer' src={IconEdit} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default TableClient
