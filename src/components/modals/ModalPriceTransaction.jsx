
import React, { useEffect } from 'react'
import { Form, Formik, useFormikContext } from 'formik'
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
  FormLabel,
  FormControl,
  Text
} from '@chakra-ui/react'
import { createPriceTransaction } from '@/services/financials'
import { Field } from '../shared/FormFields'
import { FormGroup } from '@mui/material'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  amount_bolivares: Yup.number()
    .positive('Precio inválido')
    .required('Requerido!'),
  amount_dollars: Yup.number()
    .positive('Precio inválido')
    .required('Requerido!')
})

const ModalPriceTransaction = ({ price, priceId, medicalId, getPriceTransactionsById, setTotalPay, totaltoPay }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleSizeClick = () => {
    onOpen()
  }
  const toast = useToast()
  const handleSubmit = async (data) => {
    try {
      const res = await createPriceTransaction(data)
      if (!res.error) {
        getPriceTransactionsById()
        setTotalPay(res.total_pay)
        toast({
          title: 'Éxito',
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
  const FormObserver = () => {
    const { values } = useFormikContext()
    useEffect(() => {
      values.amount_dollars = (values.amount_bolivares / price).toFixed(2)
    }, [values.amount_bolivares])
    useEffect(() => {
      values.amount_bolivares = (values.amount_dollars * price).toFixed(2)
    }, [values.amount_dollars])
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
          <ModalHeader bgColor='#0DA7D9' height='.5rem' color='#F5F5F5' textAlign='center' w='100%'>Descuento/Aumento</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody w='100%'>
            <Formik
              initialValues={{
                price,
                price_dollar: priceId,
                medical_history: medicalId,
                amount_bolivares: 0.00,
                amount_dollars: 0.00,
                concept: 'Aumento'
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                handleSubmit(values)
              }}
            >
              <Form>
                <FormObserver />
                <FormControl>
                  <Text>Tasa del dolar</Text>
                  <Field
                    name='price'
                    type='number'
                    disabled
                  />
                </FormControl>
                <FormControl>
                  <Text>Monto En Bolívares</Text>
                  <Field
                    name='amount_bolivares'
                    type='number'
                  />
                </FormControl>
                <FormControl>
                  <Text>Monto En Dolares</Text>
                  <Field
                    name='amount_dollars'
                    type='number'
                  />
                </FormControl>
                <FormGroup mt={4}>
                  <FormLabel>Concepto</FormLabel>
                  <Field as='select' name='concept' type='text'>
                    <option value='Descuento'>Descuento</option>
                    <option value='Aumento'>Aumento</option>
                  </Field>
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

export default ModalPriceTransaction
