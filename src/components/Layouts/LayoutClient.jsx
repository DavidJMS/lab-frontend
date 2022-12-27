import {
  Text,
  HStack,
  Input,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Select,
  Button,
  Image,
  Tab,
  Flex
  , Link
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import PaginationButtons from '../ui/PaginationButtons'
import TableClient from '../ui/TableClient'
import Filters from '../../pages/MedicalHistories/components/Filters'
import Header from './Header'

const LayoutClient = ({ data, handleDelete }) => {
  const title = 'Lista de Cliente'
  const navigate = useNavigate()

  return (
    <Box width='100%'>
      {/* <Header title={title} /> */}
      <Box mb={4} width='100%' justifyContent='center'>
        <Box w={['100%', '100%', '100%']} display='flex' flexDirection='column' alignItems='center'>
        <Flex flexDirection={['colum', 'row']} justifyContent='space-around' w={['100%', '60%']}>
          <Filters />
        </Flex>
          <Box width={['80%']} display='flex' flexDirection={['row', 'row', 'row', 'row']} justifyContent='center'>
            <TableClient data={data} handleDelete={handleDelete} />
          </Box>
        </Box>
      </Box>
      <Flex justifyContent={['center', 'flex-end']} w='80%'>
        <PaginationButtons />
      </Flex>
    </Box>
  )
}

export default LayoutClient
