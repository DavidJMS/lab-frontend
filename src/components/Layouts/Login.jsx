import { useState } from 'react'
import {
  Box, HStack, Text, Button, useToast, Modal, Image,
  FormControl, ModalOverlay, ModalContent, ModalHeader, ModalBody
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { Field } from '../shared/FormFields'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../action/userAction'
import * as Yup from 'yup'

import { TbSend } from 'react-icons/tb'
import backgroundImg from '@/assets/background.jpg'
import logo from '@/assets/logo_grande2.png'

const Login = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'El mínimo son 3 caracteres')
      .max(6, 'El máximo son 6 caracteres')
      .required('Requerido!'),
    password: Yup.string()
      .min(3, 'El mínimo son 3 caracteres')
      .max(15, 'El máximo son 15 caracteres')
      .required('Requerido!')
  })
  const handleSubmit = async (values) => {
    setDisabled(true)
    const { payload } = await dispatch(loginUser(values))
    if (!payload.error) {
      toast({
        title: 'Éxito',
        description: payload.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
      navigate('/historias-medicas')
    } else {
      toast({
        title: 'Error',
        description: payload.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }
    setDisabled(false)
  }
  return (
    <>
      <Image src={backgroundImg} height='100vh' width='100%' />
      <Modal
        closeOnOverlayClick={false}
        size='md'
        isCentered
        motionPreset
        isOpen
      >
        <ModalOverlay />
        <ModalContent
          m='0 2rem'
        >
          <ModalHeader color='#0DA7D9' textAlign='center' w='100%'>
            <Image mb='.5rem' src={logo} />
          </ModalHeader>
          <ModalBody>
            <Formik
              enableReinitialize
              initialValues={{
                username: '',
                password: ''
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                setDisabled(true)
                handleSubmit(values)
              }}
            >
              {({ values }) => (
                <Form>
                  <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
                    <Box width='80%'>
                      <HStack mb={4} display='flex' flexDirection={['column', 'column', 'row']}>
                        <FormControl>
                          <Text
                            align='center'
                            mb='1rem'
                            background='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,76,0.969625350140056) 0%, rgba(162,0,255,1) 100%)'
                            color='transparent'
                            style={{ '-webkit-background-clip': 'text' }}
                          >
                            Bienvenido. Te deseamos una bonita jornada de trabajo!
                          </Text>
                          <Field m='5px 0' type='text' name='username' placeholder='Usuario' />
                          <Field m='5px 0' type='password' name='password' placeholder='Contraseña' />
                        </FormControl>
                      </HStack>
                    </Box>
                    <HStack w='100%' justifyContent='center'>
                      <Button m='1rem 2.5rem' type='submit' disabled={disabled} p='5px' width='100%' maxWidth='320px'>
                        <Text mr='5px'>Entrar</Text>
                        <TbSend size='1.3rem' color='white' />
                      </Button>
                    </HStack>
                  </Box>
                </Form>)}
            </Formik>
          </ModalBody>
          {/* <ModalFooter /> */}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Login
