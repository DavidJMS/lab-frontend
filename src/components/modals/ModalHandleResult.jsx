// Dependecies
import React, { useState } from 'react'
import {
  Modal, ModalOverlay, ModalContent, Box, HStack, Text,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure,
  FormControl
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

// Form Components
import { Field } from '@/components/shared/FormFields'

// Services
import { createResult } from '@/services/results'

// Assets
import { AiFillFileText } from 'react-icons/ai'
import { HiOutlineDocumentPlus } from 'react-icons/hi2'

const ModalHandleResult = ({ getMedicalResults, medicalId }) => {
  // Consts to handle statement
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('xl')
  const [disabled, setDisabled] = useState(false)
  // Usefull functions1
  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }
  // Validation Schema to use in my form
  const validationSchema = Yup.object({
    document: Yup.mixed()
      .required('Este campo es requerido'),
    name: Yup.string()
      .min(3, 'El máximo son 3 caracteres')
      .max(50, 'El máximo son 50 caracteres')
      .required('Este campo es requerido')
  })
  // Functions to save
  const handleSubmit = async (data) => {
    try {
      setDisabled(true)
      const resp = await createResult(data)
      // only if create financials is true
      if (resp) getMedicalResults()
    } catch (error) {
      console.log(error)
    } finally {
      setDisabled(false)
    }
  }
  // Rendering...
  return (
    <>
      <Button bgColor='#D0D0D0' fontSize={['.8rem', '1rem']} mr={8} onClick={() => handleSizeClick(size)}>Agregar</Button>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='1rem' color='#F5F5F5' textAlign='center' w='100%'>Registrar Resultado</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody>
            <Formik
              initialValues={{
                medical_history: medicalId,
                name: '',
                document: ''
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                handleSubmit(values)
              }}
            >
              {({ values, errors, setFieldValue }) => (
                <Form>
                  <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
                    <Box mt={4} width='80%'>
                      <HStack mb={4} display='flex' flexDirection={['column', 'column', 'row']}>
                        <FormControl>
                          <Text>Nombre</Text>
                          <Field
                            name='name'
                            type='text'
                          />
                        </FormControl>
                      </HStack>
                      <HStack mb={4} display='flex' flexDirection={['column', 'column', 'row']}>
                        <FormControl>
                          <label htmlFor='file'>
                            Archivo
                            {values.document ? <AiFillFileText size='3rem' color='#0DA7D9' /> : <HiOutlineDocumentPlus size='3rem' color='#F44336' />}
                          </label>
                          <Text mt={2} fontSize='14px'>{values.document && `${values.document.name}`}</Text>
                          <input
                            id='file'
                            name='file2'
                            type='file'
                            onChange={(e) => { setFieldValue('document', e.target.files[0]) }}
                            hidden
                          />
                          <Text color='#F44336' fontSize='14px'>{errors?.document && `${errors.document}`}</Text>
                        </FormControl>
                      </HStack>
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

export default ModalHandleResult
