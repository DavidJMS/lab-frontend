import React, {useState} from 'react'
import { Formik, Form } from 'formik'
import {
  Text,
  HStack,
  Input,
  Box,
  Button,
  FormControl,
  useToast,
  Spacer,
  useDisclosure
} from '@chakra-ui/react'
import ModalClient from '../modals/ModalClient'
import { Field } from '../shared/FormFields'
import { useNavigate } from 'react-router-dom'
// services
import { createClient } from '../../services/clients'

const ClientForm = () => {
  // Const para los modales
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('xl')
  const toast = useToast()
  const [loadin, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      await createClient(data)
      if (!data.error) {
        navigate('/client')
      }
      toast({
        title: 'Exito',
        description: 'Cliente creado de manera exitosa',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo en error, intentelo luego.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    } finally {
      setLoading(false)
    }
  }

  const sizes = ['xl']

  return (
    <>
    <Formik
        initialValues={{
          first_names: '',
          last_names: '',
          email: '',
          dni: '',
          sex: 'Masculino',
          birth_date: '',
          phone: '',
          address: '',
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
          if (!values.sex) {
            errors.sex = 'Campo requerido'
          }
          if (!values.birth_date) {
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
            sex: values.sex,
            birth_date: values.birth_date,
            phone: values.phone,
            address: values.address,
          }
          handleSubmit(data)
        }}
      >
      <Form id='form'>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
        <Box mt={4} width='80%'>
          <HStack mb={4}>
            <FormControl>
              <Text>Nombre :</Text>
              <Field name='first_names' />
            </FormControl>
            <FormControl>
              <Text>Cedula :</Text>
              <Field name='dni' />
            </FormControl>
            <FormControl>
              <Text>Apellido :</Text>
              <Field name='last_names' />
            </FormControl>
          </HStack>
          <HStack mb={4} w='66%'>
            <FormControl>
              <Text>Sexo :</Text>
              <Field as='select' name='sexo'>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </Field>
            </FormControl>
            <Spacer />
            <FormControl>
              <Text>Numero de telefono :</Text>
              <Field name='phone'/>
            </FormControl>
            <Spacer />
          </HStack>
          <HStack mb={4}>
            <FormControl>
              <Text>Direccion :</Text>
              <Field name='address' />
            </FormControl>
            <FormControl>
              <Text>Correo :</Text>
              <Field name='email' />
            </FormControl>
            <FormControl>
              <Text>Fecha :</Text>
              <Field
              type='date'
                name='birth_date'
              />
            </FormControl>
          </HStack>
          <HStack justifyContent='end' w='100%' display='flex'>
            <ModalClient onClose={onClose} size={size} isOpen={isOpen} />

          </HStack>
        </Box>
        <HStack mt={4} w='100%' justifyContent='center'>
          <Button w='20%' type='submit'>Crear</Button>
        </HStack>
      </Box>
      </Form>
      </Formik>
    </>
  )
}

export default ClientForm
