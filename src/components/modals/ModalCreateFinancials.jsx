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
                handleSubmit(values)
              }}
            >
              <Form id='form'>
                <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
                  <Box mt={4} width='80%'>
                    <HStack mb={4} display='flex' flexDirection={['column', 'column', 'row']}>
                      <FormControl>
                        <Text>Monto</Text>
                        <Field name='amount' type='number' />
                      </FormControl>
                    </HStack>
                    <HStack mb={4} mt={4} display='flex' flexDirection={['column', 'column', 'row']}>
                      <FormControl>
                        <Text>Metodo de pago</Text>
                        <Field as='select' name='method_payment'>
                          <option value='Pago móvil'>Pago móvil</option>
                          <option value='Transferencia'>Transferencia</option>
                          <option value='Divisas'>Divisas</option>
                        </Field>
                      </FormControl>
                    </HStack>
                    <HStack mb={4} mt={4} display='flex' flexDirection={['column', 'column', 'row']}>
                      <FormControl>
                        <Text mt={[4, 4, 0]}>N de referencia</Text>
                        <Field name='number_ref' />
                      </FormControl>
                    </HStack>
                  </Box>
                  <HStack mt={4} w='100%' justifyContent='center'>
                    <Button w='20%' type='submit'>Crear</Button>
                  </HStack>
                </Box>
              </Form>
            </Formik>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalCreateFinancials
