import { Box, Flex, HStack, Link, useMediaQuery } from '@chakra-ui/react'
import TableMedicalHistory from '../ui/TableMedicalHistory'
import PaginationButtons from '../ui/PaginationButtons'
import Filters from '../../pages/MedicalHistories/components/Filters'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

const LayoutMedicalHistory = ({ data, filterMedicalHistories, setNumberPagination, getData, setData }) => {
  const navigate = useNavigate()
  return (
    <Box
      maxW='1000px'
      width='100%'
      mx='auto'
      px='50px'
    >
      <Flex
        flexDirection={['column-reverse', 'row']}
        justifyContent='space-around'
        w='100%'
        mt={4}
        alignItems={{ base: 'end', md: 'baseline' }}
      >
        <Filters handleSubmit={filterMedicalHistories} />
        <Link
          as={RouterLink}
          to='/agregar-historia-medica'
          bgColor='#D0D0D0'
          color='#fff'
          fontSize={['.8rem', '1rem']}
          padding='0.5rem'
          borderRadius='10px'
          _hover={{ color: '#fff' }}
        >
          Agregar
        </Link>
      </Flex>
      <Box
        width='100%'
        flexDirection='row'
        justifyContent='center'
        overflowX={{ base: 'scroll', md: 'hidden' }}
      >
        <TableMedicalHistory data={data} navigate={navigate} getData={getData} setData={setData} />
      </Box>
      <Flex mt={4} justifyContent='flex-end' w='100%'>
        <PaginationButtons setNumberPagination={setNumberPagination} />
      </Flex>
    </Box>
  )
}

export default LayoutMedicalHistory
