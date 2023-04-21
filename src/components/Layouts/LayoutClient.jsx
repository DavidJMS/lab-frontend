import {
  Box,
  Flex
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import PaginationButtons from '../ui/PaginationButtons'
import TableClient from '../ui/TableClient'

import ClientFilter from '../components/ClientFilter'

const LayoutClient = ({ data, handleDelete, getData, setNumberPagination }) => {
  return (
    <Box width='100%'>
      <Box mb={4} width='100%' justifyContent='center'>
        <Box w={['100%', '100%', '100%']} display='flex' flexDirection='column' alignItems='center'>
          <Flex flexDirection={['colum', 'row']} justifyContent='start' w={['90%', '60%']}>
            <ClientFilter getData={getData} />
          </Flex>
          <Box width={['80%']} display='flex' flexDirection={['row', 'row', 'row', 'row']} justifyContent='center'>
            <TableClient data={data} handleDelete={handleDelete} />
          </Box>
        </Box>
      </Box>
      <Flex justifyContent={['center', 'flex-end']} w='80%'>
        <PaginationButtons setNumberPagination={setNumberPagination} />
      </Flex>
    </Box>
  )
}

export default LayoutClient
