import {
  Box,
  Flex
  , Link
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import PaginationButtons from '../ui/PaginationButtons'
import TableClient from '../ui/TableClient'
import Filters from '../../pages/MedicalHistories/components/Filters'
import Header from './Header'

import ClientFilter from '../components/ClientFilter'

const LayoutClient = ({ data, handleDelete, getData }) => {
  const title = 'Lista de Cliente'
  const navigate = useNavigate()

  return (
    <Box width='100%'>
      <Box mb={4} width='100%' justifyContent='center'>
        <Box w={['100%', '100%', '100%']} display='flex' flexDirection='column' alignItems='center'>
          <Flex flexDirection={['colum', 'row']} justifyContent='space-around' w={['90%', '60%']}>
            <ClientFilter getData={getData} />
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
