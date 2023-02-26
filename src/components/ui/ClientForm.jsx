import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import {
  Text,
  HStack,
  Box,
  Button,
  FormControl,
  useToast,
  Spacer,
  useDisclosure
} from '@chakra-ui/react'
import { Field } from '../shared/FormFields'
import { useNavigate } from 'react-router-dom'
// services
import { createClient, editClient } from '../../services/clients'

const ClientForm = ({ client }) => {
  // Const para los modales
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('xl')
  const toast = useToast()
  const [loadin, setLoading] = useState(true)
  const navigate = useNavigate()
  const title = 'Formulario de clientes'
  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  const handleSubmit = async (data) => {
    try {
      const res = await createClient(data)
      if (res) {
        toast({
          title: 'Exito',
          description: 'Cliente creado de manera exitosa',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
        navigate('/clientes')
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
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (data, id) => {
    try {
      const res = await editClient(data, id)
      if (res) {
        toast({
          title: 'Exito',
          description: 'Cliente editado de manera exitosa',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
        navigate('/clientes')
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          first_names: client?.first_names || '',
          last_names: client?.last_names || '',
          email: client?.email || '',
          dni: client?.dni || '',
          gender: client?.gender || 'Masculino',
          age: client?.age || '',
          phone: client?.phone || '',
          address: client?.address || ''
        }}
        validate={(values) => {
          const errors = {}
          if (!values.first_names) {
            errors.first_names = 'Campo requerido'
          }
          if (!values.last_names) {
            errors.last_names = 'Campo requerido'
          }
          if (!values.email) {
            errors.email = 'Campo requerido'
          }
          if (!values.dni) {
            errors.dni = 'Campo requerido'
          }
          if (!values.gender) {
            errors.gender = 'Campo requerido'
          }
          if (!values.age) {
            errors.birth_date = 'Campo requerido'
          }
          if (!values.phone) {
            errors.phone = 'Campo requerido'
          }
          if (!values.address) {
            errors.address = 'Campo requerido'
          }
          return errors
        }}
        onSubmit={values => {
          const data = {
            first_names: values.first_names,
            last_names: values.last_names,
            email: values.email,
            dni: values.dni,
            gender: values.gender,
            age: values.age,
            phone: values.phone,
            address: values.address
          }
          if (client) handleEdit(data, client?.id)
          else handleSubmit(data)
        }}
      >
        <Form id='form'>
          <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
            <Box mt={4} width='80%'>
              <HStack mb={4} display='flex' flexDirection={['column', 'column', 'row']}>
                <FormControl>
                  <Text>Nombres:</Text>
                  <Field name='first_names' />
                </FormControl>
                <FormControl>
                  <Text>Apellidos:</Text>
                  <Field name='last_names' />
                </FormControl>
                <FormControl>
                  <Text>Cédula:</Text>
                  <Field name='dni' />
                </FormControl>
              </HStack>
              <HStack mb={4} mt={4} w={['100%', '100%', '66%']} display='flex' flexDirection={['column', 'column', 'row']}>
                <FormControl>
                  <Text>Sexo:</Text>
                  <Field as='select' name='gender'>
                    <option value='masculino'>Masculino</option>
                    <option value='femenino'>Femenino</option>
                  </Field>
                </FormControl>
                <Spacer />
                <FormControl>
                  <Text mt={[4, 4, 0]}>Teléfono:</Text>
                  <Field name='phone' />
                </FormControl>
                <Spacer />
              </HStack>
              <HStack mb={4} display='flex' flexDirection={['column', 'column', 'row']}>
                <FormControl>
                  <Text>Direccién:</Text>
                  <Field name='address' />
                </FormControl>
                <FormControl>
                  <Text>Correo:</Text>
                  <Field name='email' type='email' />
                </FormControl>
                <FormControl>
                  <Text>Edad:</Text>
                  <Field
                    type='number'
                    name='age'
                    min='1'
                    max='120'
                  />
                </FormControl>
              </HStack>

            </Box>
            <HStack mt={4} w='100%' justifyContent='center'>
              <Button w='20%' type='submit'>{client ? 'Editar' : 'Crear'}</Button>
            </HStack>
          </Box>
        </Form>
      </Formik>
    </>
  )
}

export default ClientForm
