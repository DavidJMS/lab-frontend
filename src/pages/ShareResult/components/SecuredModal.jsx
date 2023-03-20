import React, { useState } from 'react'
import {
  Modal, ModalOverlay, ModalContent, Box, HStack, Text,
  ModalHeader, ModalBody, Image, Button, useDisclosure,
  FormControl, useToast
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'

// Form Components
import { Field } from '@/components/shared/FormFields'

// Services
import { getResultByCode } from '@/services/results'

// Assets
import { TbSend } from 'react-icons/tb'
import backgroundImg from '@/assets/background.jpg'
import logo from '@/assets/logo.jpg'

export default function SecuredModal ({ setResults, onOpen }) {
  const { idResult } = useParams()
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const [disabled, setDisabled] = useState(false)
  const toast = useToast()
  const validationSchema = Yup.object({
    code: Yup.string()
      .min(6, 'El máximo son 6 caracteres')
      .max(6, 'El máximo son 6 caracteres')
      .required('Requerido!')
  })
  const handleSubmit = async (data) => {
    const results = await getResultByCode(data)
    if (!results.error) {
      setResults(results.data)
      toast({
        title: 'Exito',
        description: 'Resultados obtenidos exitosamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
      onClose()
      onOpen()
    } else {
      toast({
        title: 'Error',
        description: results.message,
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
        onClose={onClose}
        size='md'
        isCentered
        motionPreset
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent
          m='0 2rem'
        >
          <ModalHeader color='#0DA7D9' textAlign='center' w='100%'>
            <Image mb='.5rem' src={logo} />
            Hey!
          </ModalHeader>
          <ModalBody>
            <Formik
              enableReinitialize
              initialValues={{
                code: '',
                id: idResult
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
                          <Text align='center' mb='1rem'>Un gusto saludarte, necesitamos que ingreses el código para poder obtener los resultados de tus examenes</Text>
                          <Field type='text' name='code' placeholder='Ingresa el código' />
                        </FormControl>
                      </HStack>
                    </Box>
                    <HStack w='100%' justifyContent='center'>
                      <Button mb='1rem' type='submit' disabled={disabled}>
                        <Text>Enviar</Text>
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
