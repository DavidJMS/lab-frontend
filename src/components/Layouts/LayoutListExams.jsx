import React, { useEffect, useState } from 'react'
import { getExams, deleteExams } from '../../services/exams'
import { Box, Text, Flex, Img, Table, Tr, Td, Tbody, useToast, useMediaQuery, Thead, Th } from '@chakra-ui/react'
import ModalTypesExams from '../modals/ModalTypesExams'
import DeleteIcon from '../../assets/Delete.svg'

import ExamenFilter from '../components/ExamFilter'
import SpinnerLayout from '../components/Spinner'
import PaginationButtons from '../ui/PaginationButtons'

const LayoutListExams = () => {
  const [loading, setLoading] = useState(false)
  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
  const [dataExam, setDataExam] = useState([])
  const toast = useToast()

  const [linkPagination, setlinkPagination] = useState(undefined)
  const [nextPagination, setNextPagination] = useState(null)
  const [previousPagination, setpreviousPagination] = useState(null)

  useEffect(() => {
    fetchExams()
  }, [linkPagination])

  const fetchExams = async (props = undefined) => {
    try {
      setLoading(true)
      const data = props?.name ? await getExams({ linkPagination: undefined, ...props }) : await getExams({ linkPagination })
      setDataExam(data?.results)
      setNextPagination(data?.next)
      setpreviousPagination(data?.previous)
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

  const setNumberPaginationLogic = (number) => {
    if (!previousPagination && number === -1) return
    if (!nextPagination && number === 1) return
    if (number === -1) setlinkPagination(previousPagination)
    else setlinkPagination(nextPagination)
  }

  if (loading) {
    return (
      <SpinnerLayout />
    )
  }

  return (
    <Box width='100%' display='flex' flexDirection='column' alignItems='center' m={4}>
      <Flex flexDirection={['colum', 'row']} justifyContent='space-between' w='50%'>
        <ExamenFilter handleSubmit={fetchExams} />
        <ModalTypesExams fetchExams={fetchExams} />
      </Flex>
      <Table fontSize={['.8rem', '1rem']} variant='simple' width='50%' m={4}>
        {IsNotSmallScreen &&
          <Thead bg='#F4F7FF'>
            <Tr>
              <Th>Nombre</Th>
              <Th>Precio</Th>
              <Th textAlign='center'>Acciones</Th>
            </Tr>
          </Thead>}
        <Tbody>
          {dataExam && dataExam.map((exam, index) => (
            <Tr key={index}>
              <Td><Text color='#8E9196'>{exam.name}</Text></Td>
              <Td><Text color='#8E9196'>{exam.price}</Text></Td>
              <Td mt={6} display='flex' justifyContent='center'>
                <ModalTypesExams height={['.8rem','auto']} exam={exam} fetchExams={fetchExams} />
                <Img height={['.8rem','auto']} cursor='pointer' onClick={() => handleDelete(exam.id)} src={DeleteIcon} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justifyContent={['center', 'flex-end']} w='50%'>
        <PaginationButtons setNumberPagination={setNumberPaginationLogic} />
      </Flex>
    </Box>
  )
}

export default LayoutListExams
