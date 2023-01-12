import { Box, HStack, Text, Button, useToast, FormLabel } from '@chakra-ui/react'
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
            errors.username = 'Campo requerido'
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
          <Box width='100%' height='100vh' display='flex' id='login' justifyContent='center' alignItems='center'>
            <Box
              display='flex'
              flexDirection='column'
              borderRadius='5px'
              width={[
                '80%',
                '50%',
                '35%']}
              padding='2rem'
              alignItems='center'
              h='80vh'
              backgroundColor='#FFFF'
            >
              <HStack width={'100%'} flexDirection={['column', 'column', 'column']} height='100%' alignItems='center' justifyContent='center'>
                <Text className='title--login'>LOGIN</Text>
                <FormGroup className='group--login' width={['100%', '100%']} >
                  <FormLabel>usuario</FormLabel>
                  <Field borderRadius='2px' name='username' backgroundColor='#D0D0D0' w={['100%', '100%']} />
                </FormGroup>
                <FormGroup className='group--login' width='100%'>
                  <FormLabel>password</FormLabel>
                  <Field borderRadius='2px' name='password' backgroundColor='#D0D0D0' w={['100%', '100%']} />
                </FormGroup>
                <HStack>
                  <FormLabel>forgot?</FormLabel>
                </HStack>
              </HStack>
              <Button w='100%' mb={4} type='submit'>Login</Button>
            </Box>
          </Box>
        </Form>
      </Formik>
    </>
  )
}

export default Login
