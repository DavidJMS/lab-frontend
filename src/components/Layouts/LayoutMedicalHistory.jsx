import { Box, Flex } from '@chakra-ui/react'
import TableMedicalHistory from '../ui/TableMedicalHistory'
import PaginationButtons from '../ui/PaginationButtons'
import Header from './Header'
import Filters from '../../pages/MedicalHistories/components/Filters'

const LayoutMedicalHistory = ({ data }) => {
  const title = 'Historial Clinico'
  return (
    <>
      <Box width='100%'>
        <Header title={title} />
        <Box mb={4} width='100%' justifyContent='center'>
          <Box w={['100%', '100%', '100%']} display='flex' flexDirection='column' alignItems='center'>
            <Filters />
            <Box width={['40%', '80%', '100%']} display='flex' flexDirection={['row', 'row', 'row', 'row']} justifyContent='center'>
              <TableMedicalHistory data={data} />
            </Box>
          </Box>
        </Box>
        <Flex justifyContent={['center', 'flex-end']} w='80%'>
          <PaginationButtons />
        </Flex>
      </Box>
    </>
  )
}

export default LayoutMedicalHistory
