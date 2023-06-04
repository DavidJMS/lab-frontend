import {
  Box,
  Flex
} from '@chakra-ui/react'

import PaginationButtons from '../ui/PaginationButtons'
import TableClient from '../ui/TableClient'

import ClientFilter from '../components/ClientFilter'

const LayoutClient = ({ data, handleDelete, getData, setNumberPagination }) => {
  return (
    <Box width='100%' maxW='1000px' mx='auto'>
      <Box mb={4} width='100%' justifyContent='center'>
        <Box px='50px'>
          <ClientFilter getData={getData} />
          <Box overflowX={{ base: 'scroll', md: 'hidden' }}>
            <TableClient data={data} handleDelete={handleDelete} />
          </Box>
          <Flex mt={4} justifyContent='flex-end' w='100%'>
            <PaginationButtons setNumberPagination={setNumberPagination} />
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default LayoutClient
