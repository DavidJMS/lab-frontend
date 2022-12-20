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
} from '@chakra-ui/react'
import PaginationButtons from '../ui/PaginationButtons'
import Filters from '../../pages/MedicalHistories/components/Filters'
import { getFinancials } from '../../services/financials'
import TableFinancials from '../ui/TableFinancials'
import { useState, useEffect } from 'react'

import ModalCreateFinancials from '../modals/ModalCreateFinancials'

const LayoutFinancials = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    fetchData()
  }, [])
  console.log(data)
  const fetchData = async () => {
    try {
      const data = await getFinancials()
      setData(data.data)
      setLoading(true)
    } catch (error) {

    }
  }

  return (
    <Box width='100%'>
      <Box mb={4} width='100%' justifyContent='center'>
        <Box w={['100%', '100%', '100%']} display='flex' flexDirection='column' alignItems='center'>
          <Filters />
          <Box width={['80%']} display='flex' flexDirection={['row', 'row', 'row', 'row']} justifyContent='center'>
            <TableFinancials data={data} />
          </Box>
          <span>Total registrado: {data && data.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.amount), 0.0)}</span>
        </Box>
      </Box>
      <Flex justifyContent={['center', 'flex-end']} w='80%'>
        <ModalCreateFinancials />
      </Flex>
    </Box>
  )
}

export default LayoutFinancials
