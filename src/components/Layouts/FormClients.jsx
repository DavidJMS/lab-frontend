import { Box } from '@chakra-ui/react'
import TableMedicalHistory from '../ui/TableMedicalHistory'
import PaginationButtons from '../ui/PaginationButtons'
import Header from './Header'
import ModalClient from '../modals/ModalClient'
import ModalTest from '../modals/ModalTest'
import ClientForm from '../ui/ClientForm'

const FormClients = () => {
  const title = 'Formulario de clientes'
  return (
    <Box width='100%'>
      {/* <Header title={title} /> */}
      <Box mb={4} width='100%'>
        <ClientForm />
      </Box>
    </Box>
  )
}

export default FormClients
