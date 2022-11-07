import { Box, Flex } from '@chakra-ui/react'
import TableMedicalHistory from '../ui/TableMedicalHistory'
import PaginationButtons from '../ui/PaginationButtons'
import Header from './Header'

const LayoutMedicalHistory = () => {
  const title = 'Historial medico'
  return (
    <Box width='100%'>
      <Header title={title} />
      <Box mb={4} width='100%' overflow='auto' whiteSpace='nowrap'>
        <TableMedicalHistory />
      </Box>
      <Flex justifyContent='flex-end' w='84%'>
        <PaginationButtons />
      </Flex>
    </Box>
  )
}

export default LayoutMedicalHistory
