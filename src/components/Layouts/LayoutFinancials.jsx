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
import { useState } from 'react'
import { useEffect } from 'react'
  
  const LayoutFinancials = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()

    useEffect(() => {
      fetchData()
    }, [])
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
              <Box width={[ '80%' ]} display='flex' flexDirection={['row', 'row', 'row', 'row']} justifyContent='center'>
                <TableFinancials data={data} />
              </Box>
            </Box>
          </Box>
         
        </Box>
    )
  }
  
  export default LayoutFinancials
  