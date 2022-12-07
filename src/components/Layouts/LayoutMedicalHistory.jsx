import { Box, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import TableMedicalHistory from '../ui/TableMedicalHistory'
import PaginationButtons from '../ui/PaginationButtons'
import Header from './Header'

const LayoutMedicalHistory = ({ data }) => {
  const title = 'Historial Clinico'
  return (
    <>
      <Box width='100%'>
        <Header title={title} />
        <Box mb={4} width='100%' justifyContent='center'>
          <TableMedicalHistory data={data} />
        </Box>
        <Flex justifyContent={['center', 'flex-end']} w='80%'>
          <PaginationButtons />
        </Flex>
      </Box>
    </>
  )
}

export default LayoutMedicalHistory
