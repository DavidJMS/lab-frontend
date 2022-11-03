import { Box } from "@chakra-ui/react"
import TableMedicalHistory from "../ui/TableMedicalHistory"
import PaginationButtons from "../ui/PaginationButtons"
import Header from "./Header"

const LayoutMedicalHistory = () => {
    const title = 'Historial medico'
    return (
       <Box width='100%'>
        <Header title={title} />
         <Box mb={4}  width='100%' overflow='auto' whiteSpace='nowrap'>
            <TableMedicalHistory />
        </Box>
        <PaginationButtons/>
       </Box>
    )
}

export default LayoutMedicalHistory