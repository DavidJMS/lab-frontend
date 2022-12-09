import React, {useState, useEffect} from 'react'
import { Formik, Form } from 'formik'
import {
  Text,
  HStack,
  Input,
  Box,
  Stack,
  Button,
  FormControl,
  useToast,
  Spacer,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner
} from '@chakra-ui/react'
import ModalClient from '../modals/ModalClient'
import { Field, Select } from '../shared/FormFields'
import { useNavigate } from 'react-router-dom'
import ModalTest from '../modals/ModalTest'

// services
import { createMedical } from '../../services/medical'

const FormsMedical = (client) => {
  // Const para los modales
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('xl')
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [ineFront, setIneFront] = useState([])
  const [errors, setErrors] = useState({})
  const [userData, setUserData] = useState()
  const [examData, setExamData] = useState()
  const first_names = userData?.first_names || ''
  const last_names = userData?.last_names || ''
  const address = userData?.address || ''
  const dni = userData?.dni
  const email = userData?.email
  const phone = userData?.phone
  const birth_date = userData?.birth_date
  const sex = userData?.sex
console.log(examData)
  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      await createMedical(data)
      toast({
        title: 'Exito',
        description: 'Cliente creado de manera exitosa',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    } catch (error) {
     console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (examData) {
      setLoading(true)
    }
      
  }, [examData])

  useEffect(() => {
    if (examData && loading === true) {
      setLoading(false)
    }
  
  }, [loading])
  
  if (loading) return <Spinner />
  return (
    <>
    <Formik
        initialValues={{
          first_names: userData?.first_names || '',
          last_names: last_names || '',
          email:  email || '',
          dni: dni || '',
          sex:  sex || 'Masculino',
          birth_date: birth_date || '',
          phone: phone || '',
          address: address || '',
          medical_exams: examData?.id,
          total_pay: '',
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
            medical_exams: [values.medical_exams],
            total_pay: values.total_pay
          }
          handleSubmit(data)
        }}
      >
      <Form id='form'>
      <Box w='100%' mt={4} display='flex' flexDirection='column' alignItems='center'>
        <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
          <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Datos Personales</Text>
        </Box>
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
                name='birth_date'
              />
            </FormControl>
          </HStack>
          <HStack justifyContent='end' w='100%' display='flex'>
            <ModalClient setUserData={setUserData} />

          </HStack>
        </Box>
        
      </Box>
      <Box w='100%' mt={4} display='flex' flexDirection='column' alignItems='center'>
        <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
          <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Solicitud de Examen</Text>
        </Box>
        <Box mt={4} width='80%'>
          <Field name='medical_exams' />
          <Text mt={8} w={['100%','80%','20%']} borderBottom='1px solid #B7B4B4'>
            Perfil Tiroideo
          </Text>
          <Text mt={8} w={['100%','80%','20%']} borderBottom='1px solid #B7B4B4'>
            Perfil Tiroideo
          </Text>
          <HStack justifyContent='end' w='100%' mt={['10px', '10px', '0px']} display='flex'>
            <ModalTest setExamData={setExamData} />
          </HStack>
        </Box>
      </Box>

      <Box w='100%' mt={4} display='flex' flexDirection='column' alignItems='center'>
        <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
          <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Resultado del Examen</Text>
        </Box>
        <Box mt={4} width='80%'>
        </Box>
      </Box>
      <Box w='100%' mb={8} mt={4} display='flex' flexDirection='column' alignItems='center'>
        <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
          <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Datos de Pago</Text>
        </Box>
        <Box mt={4} width='80%'>
        <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Pago Movil
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel w='100%' pb={4}>
            <HStack>
              <Text w='25%'>
                Metodo de pago
              </Text>
              <Field name='name' w='auto' />
            </HStack>
            <HStack mt={4}>
            <Text w='25%'>
                Monto
              </Text>
              <Field name='name' w='auto' />
            </HStack>
            <HStack mt={4}>
            <Text w='25%' >
                Referencia
              </Text>
              <Field name='name' w='auto' />
            </HStack>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Divisas
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          <HStack>
              <Text w='25%'>
                Metodo de pago
              </Text>
              <Field name='name' w='auto' />
            </HStack>
            <HStack mt={4}>
            <Text w='25%'>
                Monto
              </Text>
              <Field name='name' w='auto' />
            </HStack>
            <HStack mt={4}>
            </HStack>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Efectivo
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          <HStack>
              <Text w='25%'>
                Metodo de pago
              </Text>
              <Field name='name' w='auto' />
            </HStack>
            <HStack mt={4}>
            <Text w='25%'>
                Monto
              </Text>
              <Field name='name' w='auto' />
            </HStack>
            <HStack mt={4}>
            </HStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
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

export default FormsMedical
