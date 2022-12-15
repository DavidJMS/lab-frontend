import { useState } from "react";
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
    Image,
    useMediaQuery
  } from '@chakra-ui/react'
  import { useNavigate } from 'react-router-dom'
import { Link } from '@chakra-ui/react'
import iconDelete from '../../assets/Delete.svg'
import SearchIcon from '../../assets/SearchClient.svg'
import IconEdit from '../../assets/Edit.svg'
import ModalTypesExams from '../modals/ModalTypesExams'



const TableClient = ({ data, handleDelete }) => {
    const title = 'Modal Cliente'
  const navigate = useNavigate()

  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')

    return (
        <Table fontSize={['.5rem', '1rem']} variant='simple' width='80%' m={4}>
            {IsNotSmallScreen &&
          <Thead  bg='#F4F7FF'>
            <Tr>
              <Th w='42%'>Nombres y Apellidos</Th>
              <Th>Cedula</Th>
              <Th>Nmro de telefono</Th>
              <Th>Eliminar</Th>
              <Th>Editar</Th>
            </Tr>
          </Thead>
            }
          <Tbody >
            {data.map((client) => (
              <Tr 
              key={client.id}
              _hover={{
                background: 'gray.50'
              }}
              >
                <Td color='#8E9196'>{client.first_names} {client.last_names}</Td>
                <Td color='#8E9196'>{client.dni}</Td>
                <Td color='#8E9196'>{client.phone}</Td>
                <Td color='#8E9196' alignItems='center'><Image cursor='pointer' w={['.5rem', '.7rem', '1rem' ,'1.5rem']} onClick={() => handleDelete(client.id)} src={iconDelete}></Image></Td>
                <Td color='#8E9196'><Image onClick={() => navigate(`edit/${client.id}/`)} w={['.5rem','1.5rem']} cursor='pointer' src={IconEdit}></Image></Td>
              </Tr>
            ))
            }
          </Tbody>
        </Table>
    )
}

export default TableClient