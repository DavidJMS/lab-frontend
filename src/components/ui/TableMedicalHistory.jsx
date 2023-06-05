import {
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useMediaQuery,
  Image,
  Switch,
  useToast
} from '@chakra-ui/react'

import deleteIcon from '../../assets/Delete.svg'
import editIcon from '../../assets/Edit.svg'
import ModalExamsOfMedical from '../modals/ModalExamsOfMedical'
import { putMedical, deleteMedical } from '../../services/medical.js'

const TableMedicalHistory = ({ data, navigate, getData, setData }) => {
  const toast = useToast()
  const deleteMedicalHistory = async (id) => {
    const res = await deleteMedical(id)
    if (!res.error) {
      setData(data.filter(medical => medical.id != id))
      toast({
        title: 'Eliminado!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    } else {
      toast({
        title: 'Error eliminando',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const editMedical = async (id, dataRequest) => {
    const dataResponse = await putMedical(id, dataRequest)
    if (!dataResponse.error) {
      getData()
      toast({
        title: 'Editado!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    } else {
      toast({
        title: 'Error editando',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }
  return (
    <Table fontSize={['.8rem', '1rem']} variant='simple'>
      <Thead bg='#F4F7FF'>
        <Tr>
          <Th>Nombre y Apellido</Th>
          <Th>Cedula</Th>
          <Th>N</Th>
          <Th textAlign='center'>Muestras tomadas</Th>
          <Th textAlign='center'>Examenes</Th>
          <Th textAlign='center'>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data && data.map((medical, index) => {
          return (
            <Tr key={index}>
              <Td><Text color='#8E9196'>{medical?.client?.full_name}</Text></Td>
              <Td><Text color='#8E9196'>{medical?.client?.dni}</Text></Td>
              <Td><Text color='#8E9196'>{medical?.number_id}</Text></Td>
              <Td display='flex' justifyContent='center'>
                <Switch colorScheme='blue' isChecked={medical.with_samples} onChange={() => { editMedical(medical.id, { with_samples: !medical.with_samples }) }} />
              </Td>
              <Td><Text color='#8E9196' display='flex' justifyContent='center' cursor='pointer'><ModalExamsOfMedical data={medical.medical_exams} /></Text></Td>
              <Td color='#8E9196' display='flex' justifyContent='center'>
                <Image onClick={() => navigate(`editar-historia-${medical?.id}`)} mx='5px' height='20px' cursor='pointer' src={editIcon} alt='editar' />
                <Image onClick={() => deleteMedicalHistory(medical.id)} mx='5px' height='20px' cursor='pointer' src={deleteIcon} alt='eliminar' />
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default TableMedicalHistory
