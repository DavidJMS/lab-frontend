import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Field } from '../shared/FormFields'
import { getExams, deleteExams } from '../../services/exams'
import { FormGroup } from '@mui/material'
import { HStack, Box, Text, Button, Flex, Input, Img, Table, Tr, Td, Tbody, useToast, useMediaQuery, Thead, Th } from '@chakra-ui/react'
import Header from './Header'
import ModalTypesExams from '../modals/ModalTypesExams'
import DeleteIcon from '../../assets/Delete.svg'
import EditIcon from '../../assets/Edit.svg'

import ModalEditExam from '../modals/ModalEditExam'
import SpinnerLayout from '../components/Spinner'

const LayoutListExams = () => {
  const [loading, setLoading] = useState(false)
  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
  const title = 'Lista de examenes'
  const [dataExam, setDataExam] = useState([])
  const toast = useToast()
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
      if (true) {
        location.reload()
        toast({
          title: 'Exito',
          description: 'Examen eliminado de manera exitosa',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
      } else {
        toast({
          title: 'Error',
          description: 'Hubo en error, intentelo luego.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
      }
    } catch (error) {
      setLoading(false)
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
        <Button backgroundColor='#D0D0D0'>Buscar</Button>

      </HStack>

      <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
        <Table fontSize={['.8rem', '1rem']} variant='simple' width='90%' m={4}>
          {IsNotSmallScreen &&
            <Thead bg='#F4F7FF'>
              <Tr>
                <Th>Nombre</Th>
                <Th>Descripción</Th>
                <Th>Precio</Th>
                <Th>Editar</Th>
                <Th>Eliminar</Th>
              </Tr>
            </Thead>}
          <Tbody>
            {dataExam && dataExam.map((exam) => (
              <Tr>
                <Td><Text color='#8E9196'>{exam.name}</Text></Td>
                <Td><Text color='#8E9196'>{exam.description}</Text></Td>
                <Td><Text color='#8E9196'>{exam.price}</Text></Td>
                <Td>
                  <ModalEditExam id={exam.id} />
                </Td>
                <Td><Img cursor='pointer' onClick={() => handleDelete(exam.id)} src={DeleteIcon} /></Td>

              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Flex justifyContent='flex-end'>
        <ModalTypesExams />
      </Flex>
    </>
  )
}

export default LayoutListExams
