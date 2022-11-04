import { Box } from "@chakra-ui/react"
import TableMedicalHistory from "../ui/TableMedicalHistory"
import PaginationButtons from "../ui/PaginationButtons"
import Header from "./Header"
import FormsMedical from "../ui/FormsMedical"
import ModalClient from '../modals/ModalClient'
import ModalTest from "../modals/ModalTest"

const LayoutFormMedical = () => {
    const title = 'Formulario Medico'
    return (
       <Box width='100%'>
        <Header title={title} />
         <Box mb={4}  width='100%'>
            <FormsMedical />
        </Box>
       </Box>
    )
}

export default LayoutFormMedical