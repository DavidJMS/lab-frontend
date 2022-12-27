import React, { useState } from 'react'
import {
  Modal, ModalOverlay, ModalContent, Box, HStack, Text,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure,
  FormControl,
  Spacer
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'

import { createFinancials } from '../../services/financials'
import { Field } from '../shared/FormFields'

const ModalCreateFinancials = ({ getMedicalPayments, medicalId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('xl')
  const [loading, setLoading] = useState(true)

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }
  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      const resp = await createFinancials(data)
      // only if create financials is true
      if (resp) getMedicalPayments()
      toast({
        title: 'Exito',
        description: 'Cliente creado de manera exitosa',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Button bgColor='#D0D0D0' fontSize={['.8rem', '1rem']} mr={8} onClick={() => handleSizeClick(size)}>Agregar</Button>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='1rem' color='#F5F5F5' textAlign='center' w='100%'>Pagos</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody>
            <>
              <Formik
                initialValues={{
                  method_payment: '',
                  amount: '',
                  number_ref: '',
                  medical_history: medicalId
                }}
                validate={(values) => {
                  const errors = {}
                  if (!values.method_payment) {
                    errors.first_names = 'Campo requerido'
                  }
                  if (!values.amount) {
                    errors.last_names = 'Campo requerido'
                  }
                  return errors
                }}
                onSubmit={values => {
                  const data = {
                    method_payment: values.method_payment,
                    amount: values.amount,
                    number_ref: values.number_ref,
                    medical_history: values.medical_history
                  }
                  handleSubmit(data)
                }}
              >
                <Form id='form'>
                  <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
                    <Box mt={4} width='80%'>
                      <HStack mb={4} display='flex' flexDirection={['column', 'column', 'row']}>
                        <FormControl>
                          <Text>Monto</Text>
                          <Field name='amount' />
                        </FormControl>
                        <FormControl>
                          <Text>Foto del billete</Text>
                          <Field name='photo_billet' />
                        </FormControl>
                      </HStack>
                      <HStack mb={4} mt={4} w={['100%', '100%', '66%']} display='flex' flexDirection={['column', 'column', 'row']}>
                        <FormControl>
                          <Text>Metodo de pago</Text>
                          <Field as='select' name='method_payment'>
                            <option value='1'>Pago movil</option>
                            <option value='2'>Divisas</option>
                          </Field>
                        </FormControl>
                        <Spacer />
                        <FormControl>
                          <Text mt={[4, 4, 0]}>Numero de referencia</Text>
                          <Field name='number_ref' />
                        </FormControl>
                        <Spacer />
                      </HStack>
                    </Box>
                    <HStack mt={4} w='100%' justifyContent='center'>
                      <Button w='20%' type='submit'>Crear</Button>
                    </HStack>
                  </Box>
                </Form>
              </Formik>
            </>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalCreateFinancials
