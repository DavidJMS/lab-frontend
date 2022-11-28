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
import { Field } from '../shared/FormFields'
import { useParams, useNavigate } from 'react-router-dom'

// services
import { editClient } from '../../services/clients'

const FormsMedical = () => {
  // Const para los modales
  let { id } = useParams()
  const toast = useToast()
  const [loadin, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
      try {
      setLoading(true)
      const datas = await editClient(data, id)
      if (!datas.error) {
        navigate('/client')
      }
      toast({
        title: 'Exito',
        description: 'Cliente editado de manera exitosa',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

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
        </Box>
        <HStack mt={4} w='100%' justifyContent='center'>
          <Button w='20%' type='submit'>Editar</Button>
        </HStack>
      </Box>
      </Form>
      </Formik>
    </>
  )
}

export default FormsMedical
