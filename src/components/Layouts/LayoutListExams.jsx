import React, { useEffect, useState } from 'react'
import { getExams, deleteExams } from '../../services/exams'
import { Box, Text, Flex, Img, Table, Tr, Td, Tbody, useToast, useMediaQuery, Thead, Th } from '@chakra-ui/react'
import ModalTypesExams from '../modals/ModalTypesExams'
import DeleteIcon from '../../assets/Delete.svg'

import ExamenFilter from '../components/ExamFilter'
import SpinnerLayout from '../components/Spinner'

const LayoutListExams = () => {
  const [loading, setLoading] = useState(false)
  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
  const [dataExam, setDataExam] = useState([])
  const toast = useToast()
  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async (props = undefined) => {
    console.log(props)
    try {
      setLoading(true)
      const data = props?.name ? await getExams(props) : await getExams()
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
      const res = await deleteExams(id)
      if (res) {
        fetchExams()
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
      <Box width='100%' display='flex' flexDirection='column' alignItems='center' m={4}>
        <ExamenFilter handleSubmit={fetchExams} />
        <Table fontSize={['.8rem', '1rem']} variant='simple' width='90%' m={4}>
          {IsNotSmallScreen &&
            <Thead bg='#F4F7FF'>
              <Tr>
                <Th>Nombre</Th>
                <Th>Descripción</Th>
                <Th>Precio</Th>
                <Th textAlign='center'>Acciones</Th>
              </Tr>
            </Thead>}
          <Tbody>
            {dataExam && dataExam.map((exam, index) => (
              <Tr key={index}>
                <Td><Text color='#8E9196'>{exam.name}</Text></Td>
                <Td><Text color='#8E9196'>{exam.description}</Text></Td>
                <Td><Text color='#8E9196'>{exam.price}</Text></Td>
                <Td display='flex'>
                  <ModalTypesExams exam={exam} fetchExams={fetchExams} />
                  <Img cursor='pointer' onClick={() => handleDelete(exam.id)} src={DeleteIcon} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Flex justifyContent='flex-end'>
        <ModalTypesExams fetchExams={fetchExams} />
      </Flex>
    </>
  )
}

export default LayoutListExams
