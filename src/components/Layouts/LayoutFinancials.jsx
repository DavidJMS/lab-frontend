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
  import { useNavigate } from 'react-router-dom'
  import { Link } from '@chakra-ui/react'
  import PaginationButtons from '../ui/PaginationButtons'
  import Filters from '../../pages/MedicalHistories/components/Filters'
  import Header from './Header'
import TableFinancials from '../ui/TableFinancials'
  
  const LayoutFinancials = ({ data, handleDelete }) => {
    const title = 'Lista de finanzas'
  
    return (
      <Box width='100%'>
          <Header title={title} />
          <Box mb={4} width='100%' justifyContent='center'>
            <Box w={['100%', '100%', '100%']} display='flex' flexDirection='column' alignItems='center'>
              <Filters />
              <Box width={[ '80%' ]} display='flex' flexDirection={['row', 'row', 'row', 'row']} justifyContent='center'>
                <TableFinancials />
              </Box>
            </Box>
          </Box>
          <Flex justifyContent={['center', 'flex-end']} w='80%'>
            <PaginationButtons />
          </Flex>
        </Box>
    )
  }
  
  export default LayoutFinancials
  