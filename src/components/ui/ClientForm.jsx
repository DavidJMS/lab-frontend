// Dependecies
import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import {
  Text,
  HStack,
  Box,
  Button,
  FormControl,
  useToast,
  Spacer
} from '@chakra-ui/react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

// Form Components
import { Field } from '../shared/FormFields'

// Services
import { createClient, editClient } from '../../services/clients'

const ClientForm = ({ client }) => {
  const toast = useToast()
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  // Validation Schema
  const validationSchema = Yup.object({
    first_names: Yup.string()
      .max(30, 'El máximo de caracteres es de 30')
      .min(3, 'El máximo de caracteres es de 3')
      .required('Requerido!'),
    last_names: Yup.string()
      .max(30, 'El máximo de caracteres es de 30')
      .min(3, 'El máximo de caracteres es de 3')
      .required('Requerido!'),
    email: Yup.string()
      .max(30, 'El máximo de caracteres es de 100')
      .min(3, 'El máximo de caracteres es de 3')
      .email('Introduzca un email válido'),
    dni: Yup.string()
      .max(30, 'El máximo de caracteres es de 30')
      .min(7, 'El máximo de caracteres es de 7')
      .required('Requerido!'),
    gender: Yup.string().oneOf(
      ['masculino', 'femenino', 'Masculino', 'Femenino'],
      'Genero inválido')
      .required('Requerido!'),
    age: Yup.number()
      .positive('Inválido')
      .integer('Inválido')
      .required('Requerido!'),
    phone: Yup.string()
      .matches('^[0-9-+]{9,15}$', 'Inválido'),
    address: Yup.string()
      .max(30, 'El máximo de caracteres es de 30')
  })

  // Functions to submit data
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
      setDisabled(false)
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
      setDisabled(false)
    }
  }

  return (
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
      validationSchema={validationSchema}
      onSubmit={values => {
        setDisabled(true)
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
      <Form>
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
                <Text>Dirección:</Text>
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
                />
              </FormControl>
            </HStack>
          </Box>
          <HStack mt={4} w='100%' justifyContent='center'>
            <Button w='20%' type='submit' disabled={disabled}>{client ? 'Editar' : 'Crear'}</Button>
          </HStack>
        </Box>
      </Form>
    </Formik>
  )
}

export default ClientForm
