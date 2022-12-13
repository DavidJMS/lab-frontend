import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {Field} from '../shared/FormFields'
import { getExams } from "../../services/exams";
import { FormGroup } from "@mui/material";
import { HStack, Box, Text, Input, Img } from "@chakra-ui/react";
import Header from "./Header";
import ModalTypesExams from "../modals/ModalTypesExams";
import DeleteIcon from '../../assets/Delete.svg'
import EditIcon from '../../assets/Edit.svg'
import { deleteExams } from "../../services/exams";
import ModalEditExam from "../modals/ModalEditExam";

const LayoutListExams = () => {
  const title = 'Lista de examenes'
  const [dataExam, setDataExam] = useState([])
  useEffect(() => {
    fetchUser()
  }, [])
  console.log(dataExam)
  const fetchUser = async () => {
    try {
      const data = await getExams()
      setDataExam(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteExams(id)
      location.reload()
      toast({
        title: 'Exito',
        description: 'Cliente eliminado de manera exitosa',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    } catch (error) {
      setLoading(false)
      toast({
        title: 'Error',
        description: 'Hubo en error, intentelo luego.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  return (
    <>
    <Header title={title} />
    <HStack w='100%' display='flex' mt={4} justifyContent='center'>
      <Text>
        Examen :
      </Text>

      <Input  w='30%'/>
      <ModalTypesExams />
    </HStack>
     <Box alignItems='center' flexDirection='column' display='flex' w='100%'>
     {dataExam && dataExam.map((exam, i) => (
        <HStack w='100%' display='flex' justifyContent={'center'} key={i} mt={8}>
          <Text w='40%' height='2rem' borderRadius='5px' paddingLeft='.8rem' border='1.6px solid #E2E8F0' backgroundColor='none'>
          {exam.name}
          </Text>
          <Img cursor='pointer' onClick={() => handleDelete(exam.id)} src={DeleteIcon}></Img>
          <ModalEditExam id={exam.id} />
        </HStack>
      ))}
     </Box>
    </>
  )
}

export default LayoutListExams