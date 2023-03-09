import React, { useState } from 'react'
import {
  Modal, ModalOverlay, ModalContent, Box, HStack, Text,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure,
  FormControl,
  Spacer
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'

import { createPayments } from '../../services/financials'
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
      const resp = await createPayments(data)
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
              enableReinitialize
              initialValues={{
                divisa: 'Bolívares',
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
              {({
                setFieldValue,
                setFieldTouched,
                values,
                errors,
                touched
              }) => (<Form id='form'>
                <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
                  <Box mt={4} width='80%'>
                    <HStack mb={4} mt={4} display='flex' flexDirection={['column', 'column', 'row']}>
                      <FormControl>
                        <Text>Moneda</Text>
                        <Field as='select' name='divisa'>
                          <option value='Dolares'>Dolares</option>
                          <option value='Bolívares'>Bolívares</option>
                        </Field>
                      </FormControl>
                    </HStack>
                    <HStack mb={4} mt={4} display='flex' flexDirection={['column', 'column', 'row']}>
                      <FormControl>
                        <Text>Método de pago</Text>
                        <Field as='select' name='method_payment'>
                          <option value='Pago Interbancario'>Pago Interbancario</option>
                          <option value='Efectivo'>Efectivo</option>
                        </Field>
                      </FormControl>
                    </HStack>
                    <HStack mb={4} display='flex' flexDirection={['column', 'column', 'row']}>
                      <FormControl>
                        <Text>Monto</Text>
                        <Text>En Bolívares</Text>
                        <Field name='amount_bolivares' type='number' disabled={values?.divisa === 'Dolares'} />
                      </FormControl>
                      <FormControl>
                        <Text>Monto</Text>
                        <Text>En Dolares</Text>
                        <Field name='amount_dollars' type='number' disabled={values?.divisa === 'Bolívares'} />
                      </FormControl>
                    </HStack>
                    {values.method_payment === 'Pago Intercambiario' &&
                      <HStack mb={4} mt={4} display='flex' flexDirection={['column', 'column', 'row']}>
                        <FormControl>
                          <Text mt={[4, 4, 0]}>Referencia</Text>
                          <Field name='number_ref' />
                        </FormControl>
                      </HStack>}
                  </Box>
                  <HStack mt={4} w='100%' justifyContent='center'>
                    <Button w='20%' type='submit'>Crear</Button>
                  </HStack>
                </Box>
              </Form>)}
            </Formik>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalCreateFinancials
