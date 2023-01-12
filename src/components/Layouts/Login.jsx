import { Box, HStack, Text, Button, useToast } from '@chakra-ui/react'
import { FormGroup } from '@mui/material'
import { Formik, Form } from 'formik'
import { Field } from '../shared/FormFields'
import { login } from '../../services/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const toast = useToast()
  const navigate = useNavigate()
  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validate={(values) => {
          const errors = {}
          if (!values.username) {
            errors.first_names = 'Campo requerido'
          }
          if (!values.password) {
            errors.password = 'Campo requerido'
          }
          return errors
        }}
        onSubmit={async (values) => {
          const res = await login(values)
          if (res) {
            toast({
              title: 'Exito',
              description: res.message,
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top-right'
            })
            navigate('/historias-medicas')
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
        }}
      >
        <Form id='form'>
          <Box width='100%' height='100vh' display='flex' backgroundColor='#FFF' justifyContent='center' alignItems='center'>
            <Box
              display='flex'
              flexDirection='column'
              className='block--form__login'
              borderRadius='5px'
              width={[
                '80%',
                '50%',
                '35%']}
              padding='2rem'
              alignItems='center'
              h='40vh'
              backgroundColor='#0DA7D9'
            >
              <HStack w='100%' flexDirection={['column', 'column', 'column']} height='100%' alignItems='center' justifyContent='center'>
                <FormGroup>
                  <Text color='#FFF'>Usuario</Text>
                  <Field name='username' w={['100%', '100%']} />
                </FormGroup>
                <FormGroup>
                  <Text color='#FFF'>Contraseña</Text>
                  <Field name='password' w={['100%', '100%']} />
                </FormGroup>
              </HStack>
              <Button backgroundColor='#FFF' w='50%' color='#0DA7D9' mb={4} type='submit'>Iniciar</Button>
            </Box>
          </Box>
        </Form>
      </Formik>
    </>
  )
}

export default Login
