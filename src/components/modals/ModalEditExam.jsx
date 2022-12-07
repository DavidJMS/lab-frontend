
  import React, { useEffect } from "react";
  import EditIcon from '../../assets/Edit.svg'
  import { Form, Formik } from "formik";
  import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, HStack, Img, FormLabel
  } from '@chakra-ui/react'
  import { editExam } from "../../services/exams";
    import {Field} from '../shared/FormFields'
    import { FormGroup } from "@mui/material";
  
  const ModalEditExam = ({ id }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [size, setSize] = React.useState('full')
    console.log(id)

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }
  
  const handleSubmit = async (data) => {
    try {
        await editExam(data, id)
    } catch (error) {
        console.log(error)
    }
  }

  const sizes = [ 'full']

  return (
    <>
      <Button
        bgColor='#FFFF'
        mr={8}
        onClick={() => handleSizeClick(size)}
      >
        <Img src={EditIcon}></Img>
      </Button>

      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='.5rem' color='#F5F5F5' textAlign='center' w='100%'>Editar examen</ModalHeader>
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
  
export default ModalEditExam
  