// Dependecies
import React from 'react'
import { Form, Formik } from 'formik'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useToast,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  HStack,
  Img,
  FormLabel
} from '@chakra-ui/react'
import { FormGroup } from '@mui/material'
import * as Yup from 'yup'

// Form Components
import { Field } from '../shared/FormFields'

// Assets
import { createExam, editExam } from '../../services/exams'
import EditIcon from '../../assets/Edit.svg'

const ModalTypesExams = ({ exam, fetchExams }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('full')
  const toast = useToast()
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'El máximo son 3 caracteres')
      .max(50, 'El máximo son 50 caracteres')
      .required('Requerido!'),
    price: Yup.number()
      .positive('Inválido')
      .max(9999999999.99, 'El máximo son 9999999999.99 caracteres')
  })
  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }
  const handleSubmit = async (data) => {
    try {
      const resp = await createExam(data)
      if (resp) {
        fetchExams()
        toast({
          title: 'Exito',
          description: 'Examen creado exitosamente',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
        onClose()
      } else {
        toast({
          title: 'Error',
          description: 'Hubo un error',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleEdit = async (data) => {
    try {
      const resp = await editExam(data, exam?.id)
      if (resp) {
        fetchExams()
        toast({
          title: 'Exito',
          description: 'Examen editado exitosamente',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
        onClose()
      } else {
        toast({
          title: 'Error',
          description: 'Hubo un error',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {exam
        ? <Button
            bgColor='#FFFF'
            mr={8}
            onClick={() => handleSizeClick(size)}
          >
          <Img src={EditIcon} />
        </Button>
        : <Button
            bgColor='#D0D0D0'
            mr={8}
            onClick={() => handleSizeClick(size)}
            display={{ base: 'none', lg: 'flex' }}
          >
          Agregar
          </Button>}

      <Modal onClose={onClose} isOpen={isOpen} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='.5rem' color='#F5F5F5' textAlign='center' w='100%'>Crear Examen</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody w='100%'>
            <Formik
              initialValues={{
                name: exam?.name || '',
                description: exam?.description || '',
                price: exam?.price || ''
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                if (exam) handleEdit(values)
                else handleSubmit(values)
              }}
            >
              <Form id='form'>
                <FormGroup>
                  <FormLabel>Nombre</FormLabel>
                  <Field name='name' />
                </FormGroup>

                <FormGroup mt={4}>
                  <FormLabel>Precio en Dolares</FormLabel>
                  <Field name='price' type='number' />
                </FormGroup>
                <HStack mt={4} w='100%' justifyContent='center'>
                  <Button w='20%' type='submit'>Crear</Button>
                </HStack>
              </Form>
            </Formik>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalTypesExams
