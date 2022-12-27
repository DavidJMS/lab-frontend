import { Box, Flex, HStack, Link, useMediaQuery } from '@chakra-ui/react'
import TableMedicalHistory from '../ui/TableMedicalHistory'
import PaginationButtons from '../ui/PaginationButtons'
import Header from './Header'
import Filters from '../../pages/MedicalHistories/components/Filters'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

const LayoutMedicalHistory = ({ data, filterMedicalHistories }) => {
  const title = 'Historial Clinico'
  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
  const navigate = useNavigate()

  return (
    <Box width='100%'>
      {/* <Header title={title} /> */}
      <Box mb={4} width='100%' justifyContent='center'>
        <Box w={['100%', '100%', '100%']} display='flex' flexDirection='column' alignItems='center'>
          <Flex flexDirection={['colum', 'row']} justifyContent='space-around' w={['100%', '82%']}>
            <Filters handleSubmit={filterMedicalHistories} />
            <HStack width={['90px', '100px']} position='relative' mt={['120px', '100px', '0px']}>
              {IsNotSmallScreen &&
                <Link
                  as={RouterLink}
                  to='/agregar-historia-medica'
                  bgColor='#D0D0D0'
                  color='#fff'
                  fontSize={['.8rem', '1rem']}
                  padding='0.5rem'
                  borderRadius='10px' mr={8}
                >Agregar
                </Link>}
            </HStack>
          </Flex>
          <Box width={['40%', '80%', '100%']} display='flex' flexDirection={['row', 'row', 'row', 'row']} justifyContent='center'>
            <TableMedicalHistory data={data} navigate={navigate} />
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
