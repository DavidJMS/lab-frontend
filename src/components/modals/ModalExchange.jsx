
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
  FormLabel
} from '@chakra-ui/react'
import { createPriceDollar } from '@/services/financials'
import { Field } from '../shared/FormFields'
import { FormGroup } from '@mui/material'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  price: Yup.number()
    .positive('El precio debe de ser positivo')
})

const ModalExchange = ({ fetchData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleSizeClick = () => {
    onOpen()
  }
  const toast = useToast()
  const handleSubmit = async (data) => {
    try {
      const resp = await createPriceDollar(data)
      if (resp) {
        fetchData()
        toast({
          title: 'Éxito',
          description: 'Tasa actualizada',
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
      <Button
        bgColor='#D0D0D0'
        mr={8}
        onClick={() => handleSizeClick()}
      >
        Agregar
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='.5rem' color='#F5F5F5' textAlign='center' w='100%'>Crear Tasa</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody w='100%'>
            <Formik
              initialValues={{
                price: 1
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                handleSubmit(values)
              }}
            >
              <Form>
                <FormGroup mt={4}>
                  <FormLabel>Precio</FormLabel>
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

export default ModalExchange
