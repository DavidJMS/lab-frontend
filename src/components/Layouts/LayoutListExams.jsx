import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Field } from '../shared/FormFields'
import { getExams, deleteExams } from '../../services/exams'
import { FormGroup } from '@mui/material'
import { HStack, Box, Text, Input, Img, Table,Tr,Td,Tbody, useMediaQuery, Thead, Th } from '@chakra-ui/react'
import Header from './Header'
import ModalTypesExams from '../modals/ModalTypesExams'
import DeleteIcon from '../../assets/Delete.svg'
import EditIcon from '../../assets/Edit.svg'

import ModalEditExam from '../modals/ModalEditExam'
import SpinnerLayout from '../components/Spinner'

const LayoutListExams = () => {
  const [ loading, setLoading ] = useState(false)
  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
  const title = 'Lista de examenes'
  const [dataExam, setDataExam] = useState([])
  useEffect(() => {
    fetchUser()
  }, [])
  const fetchUser = async () => {
    try {
      setLoading(true)
      const data = await getExams()
      setDataExam(data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      await deleteExams(id)
      location.reload()
      toast({
        title: 'Exito',
        description: 'Cliente eliminado de manera exitosa',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    } catch (error) {
      setLoading(false)
      toast({
        title: 'Error',
        description: 'Hubo en error, intentelo luego.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <SpinnerLayout />
    )
  }

  return (
    <>
      {/* <Header title={title} /> */}
      <HStack w='100%' display='flex' mt={4} justifyContent='center'>
        <Text>
          Examen :
        </Text>

        <Input w='30%' />
        <ModalTypesExams />
      </HStack>
      <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
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
          {dataExam && dataExam.map((exam) => (
            <Tr>
              <Td><Text color='#8E9196'>{exam.name}</Text></Td>
              <Td><Img cursor='pointer' onClick={() => handleDelete(exam.id)} src={DeleteIcon} /></Td>
              <Td>
            <ModalEditExam id={exam.id} /></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </Box>
    </>
  )
}

export default LayoutListExams
