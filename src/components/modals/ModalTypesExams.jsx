
  import React, { useEffect } from "react";
  import SearchIcon from '../../assets/SearchTest.svg'
  import { Form, Formik } from "formik";
  import {
    Modal, ModalOverlay, ModalContent, useToast,
    ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, HStack, Text, FormLabel
  } from '@chakra-ui/react'
  import { createExam } from "../../services/exams";
  import { useNavigate } from "react-router-dom";
    import {Field} from '../shared/FormFields'
    import { FormGroup } from "@mui/material";
  
  const ModalTypesExams = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [size, setSize] = React.useState('full')
    const toast = useToast()
    const navigate = useNavigate()

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }
  
  const handleSubmit = async (data) => {
    try {
        await createExam(data)
        if (true) {
          toast({
            title: 'Exito',
            description: 'Cliente creado de manera exitosa',
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

  const sizes = [ 'full']

  return (
    <>
      <Button
        bgColor='#D0D0D0'
        mr={8}
        onClick={() => handleSizeClick(size)}
      >
        Agregar
      </Button>

      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='.5rem' color='#F5F5F5' textAlign='center' w='100%'>Crear examen</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody w='100%' >
          <Formik
         initialValues={{
          name: '',
          description: '',
          price: ''
        }}
        validate={(values) => {
          const errors = {}
          if (!values.name) {
            errors.name = 'Campo requerido'
          }
          if (!values.description) {
            errors.description = 'Campo requerido'
          }
          if (!values.price) {
            errors.price = 'Campo requerido'
          }
          return errors
        }}
        onSubmit={values => {
          const data = {
            name: values.name,
            description: values.description,
            price: values.price,
          }
          console.log(data)
          handleSubmit(data)
        }}
      >
        <Form id="form">
            <FormGroup>
            <FormLabel>Name</FormLabel>
            <Field name='name' />
            </FormGroup>

            <FormGroup mt={4}>
            <FormLabel>Description</FormLabel>
            <Field name='description' />
            </FormGroup>

            <FormGroup mt={4}>
            <FormLabel>Price</FormLabel>
            <Field name='price' />
            </FormGroup>
        <HStack mt={4} w='100%' justifyContent='center'>
          <Button w='20%' type='submit'>Crear</Button>
        </HStack>
        </Form>
        </Formik>
          </ModalBody>
          <ModalFooter>
          
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
  
export default ModalTypesExams
  