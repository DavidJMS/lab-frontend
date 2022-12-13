import { Box, Flex, HStack, Link } from '@chakra-ui/react'
import TableMedicalHistory from '../ui/TableMedicalHistory'
import PaginationButtons from '../ui/PaginationButtons'
import Header from './Header'
import Filters from '../../pages/MedicalHistories/components/Filters'
import { Link as RouterLink } from 'react-router-dom'

const LayoutMedicalHistory = ({ data, filterMedicalHistories }) => {
  const title = 'Historial Clinico'
  return (
    <Box width='100%'>
      <Header title={title} />
      <Box mb={4} width='100%' justifyContent='center'>
        <Box w={['100%', '100%', '100%']} display='flex' flexDirection='column' alignItems='center'>
          <Flex flexDirection={['colum', 'row']} justifyContent='space-around' w='82%'>
            <Filters handleSubmit={filterMedicalHistories} />
            <HStack mb={4} mt={4} />
            <HStack width={['90px', '100px']} position='relative' mt={['100px', '100px', '0px']}>
              <Link
                as={RouterLink}
                to='/add/medical'
                bgColor='#D0D0D0'
                fontSize={['.8rem', '1rem']}
                padding='0.5rem'
                borderRadius='10px' mr={8}
              >Agregar
              </Link>
            </HStack>
          </Flex>
          <Box width={['40%', '80%', '100%']} display='flex' flexDirection={['row', 'row', 'row', 'row']} justifyContent='center'>
            <TableMedicalHistory data={data} />
          </Box>
        </Box>
      </Box>
      <Flex justifyContent={['center', 'flex-end']} w='80%'>
        <PaginationButtons />
      </Flex>
    </Box>
  )
}

export default LayoutMedicalHistory
