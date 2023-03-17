import React, { useState, useEffect } from 'react'
import {
  Modal, ModalOverlay, ModalContent, Box, HStack, Text,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure,
  FormControl
} from '@chakra-ui/react'
import { Formik, Form, useFormikContext, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { createPayments } from '../../services/financials'
import { Field } from '../shared/FormFields'

const ModalCreateFinancials = ({ getMedicalPayments, medicalId, price, priceId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('xl')
  const [disabled, setDisabled] = useState(false)
  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }
  const validationSchema = Yup.object({
    divisa: Yup.string().oneOf(
      ['Dolares', 'Bolivares'],
      'Divisa invalida'
    ),
    method_payment: Yup.string().oneOf(
      ['Pago Interbancario', 'Efectivo'],
      'Metodo de pago invalido'
    ),
    amount_bolivares: Yup.number()
      .positive()
      .required('Este campo es requerido'),
    amount_dollars: Yup.number()
      .positive()
      .required('Este campo es requerido'),
    number_ref: Yup.string()
      .min(3, 'El minimo son 3 caracteres')
      .max(30, 'El minimo son 30 caracteres'),
    medical_history: Yup.number().positive(),
    price: Yup.number().positive()
  })
  const handleSubmit = async (data) => {
    try {
      setDisabled(true)
      const resp = await createPayments(data)
      // only if create financials is true
      if (resp) getMedicalPayments()
    } catch (error) {
      console.log(error)
    } finally {
      setDisabled(false)
    }
  }
  const FormObserver = () => {
    const { values } = useFormikContext()
    useEffect(() => {
      if (values?.divisa === 'Bolivares') {
        values.amount_dollars = (values.amount_bolivares / price).toFixed(2)
      } else {
        values.amount_bolivares = (values.amount_dollars * price).toFixed(2)
      }
    }, [values])
  }
  return (
    <>
      <Button bgColor='#D0D0D0' fontSize={['.8rem', '1rem']} mr={8} onClick={() => handleSizeClick(size)}>Agregar</Button>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='1rem' color='#F5F5F5' textAlign='center' w='100%'>Registrar Pago</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody>
            <Formik
              enableReinitialize
              initialValues={{
                divisa: 'Bolivares',
                method_payment: 'Pago Interbancario',
                amount_bolivares: '',
                amount_dollars: '',
                number_ref: '',
                medical_history: medicalId,
                price: priceId
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                handleSubmit(values)
              }}
            >
              {({ values }) => (
                <Form>
                  <FormObserver />
                  <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
                    <Box mt={4} width='80%'>
                      <HStack mb={4} mt={4} display='flex' flexDirection={['column', 'column', 'row']}>
                        <FormControl>
                          <Text>Moneda</Text>
                          <Field as='select' name='divisa'>
                            <option value='Dolares'>Dolares</option>
                            <option value='Bolivares'>Bolívares</option>
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
                          <Field
                            name='amount_bolivares'
                            type='number'
                            disabled={values?.divisa === 'Dolares'}
                          />
                        </FormControl>
                        <FormControl>
                          <Text>Monto</Text>
                          <Text>En Dolares</Text>
                          <Field
                            name='amount_dollars'
                            type='number'
                            disabled={values?.divisa === 'Bolívares'}
                          />
                        </FormControl>
                      </HStack>
                      {values.method_payment === 'Pago Interbancario' &&
                        <HStack mb={4} mt={4} display='flex' flexDirection={['column', 'column', 'row']}>
                          <FormControl>
                            <Text mt={[4, 4, 0]}>Referencia</Text>
                            <Field name='number_ref' />
                          </FormControl>
                        </HStack>}
                    </Box>
                    <HStack mt={4} w='100%' justifyContent='center'>
                      <Button w='20%' type='submit' disabled={disabled}>Crear</Button>
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
