import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import {
  Text,
  HStack,
  Box,
  Button,
  FormControl,
  useToast,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  Img,
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
  Th
} from '@chakra-ui/react'
import ModalClient from '../modals/ModalClient'
import { Field } from '../shared/FormFields'
import ModalTest from '../modals/ModalTest'
import * as Yup from 'yup'
import deleteIcon from '../../assets/Delete.svg'
import { useLocation, useParams } from 'react-router-dom'

// services
import { createMedical, getPaymentsMedical } from '../../services/medical'

// My Validation Definition to use in form
const validationShema = Yup.object({
  first_names: Yup.string()
    .max(25, 'El maximo de caracteres es de 25'),
  last_names: Yup.string()
    .max(25, 'El maximo de caracteres es de 25'),
  email: Yup.string()
    .max(25, 'El maximo de caracteres es de 25'),
  dni: Yup.string()
    .max(25, 'El maximo de caracteres es de 25'),
  gender: Yup.string()
    .max(25, 'El maximo de caracteres es de 25'),
  birth_date: Yup.string()
    .max(25, 'El maximo de caracteres es de 25'),
  phone: Yup.string()
    .max(25, 'El maximo de caracteres es de 25'),
  address: Yup.string()
    .max(25, 'El maximo de caracteres es de 25')
})

const FormsMedical = (client) => {
  // Some utils to use
  const path = useLocation()
  const toast = useToast()

  // Const to handle my statement
  const [loading, setLoading] = useState(false)
  const { medichalId } = useParams()
  const [userData, setUserData] = useState({
    first_names: '',
    last_names: '',
    email: '',
    dni: '',
    gender: 'Masculino',
    birth_date: '',
    phone: '',
    address: ''
  })
  const [totalPay, setTotalPay] = useState(0)
  const [examData, setExamData] = useState([])
  const [results_exams, setResults_exams] = useState()// This only use if components is used in edit page
  const [payments, setPayments] = useState() // This only use if components is used in edit page

  // Funtions to get main data
  const getPayments = async () => {
    const response = await getPaymentsMedical(medichalId)
    setPayments(response)
  }
  // Some useEffects
  useEffect(() => {
    if (examData || userData) {
      setLoading(true)
    }
  }, [userData, examData])

  useEffect(() => {
    if (examData && loading === true || userData && loading === true) {
      setLoading(false)
    }
  }, [loading])

  useEffect(() => {
    // Execute this funtions only if a edit form not add form
    if (medichalId) { getPayments() }
  }, [])

  // Funtions to hanlde form data
  const handleAddExamData = (newExam) => {
    if (!examData.some((exam) => exam.id === newExam.id)) {
      setExamData(examData => [...examData, newExam])
      setTotalPay(totalPay + parseFloat(newExam.price))
    }
  }

  const handleRemoveExamData = (props) => {
    const newExamData = examData.filter((exam) => {
      return exam.id !== props.id
    })
    setExamData(newExamData)
    setTotalPay(totalPay - parseFloat(props.price))
  }

  const handleFileChange = (e) => setResults_exams({ ...Form, [e.target.name]: e.target.files[0] })

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

  if (loading) return <Spinner />
  return (
    <>
      <Formik
        initialValues={
          {
            medical_exams: examData ? examData.map(exam => (exam.id)) : [],
            total_pay: totalPay,
            results_exams,
            ...userData
          }
        }
        enableReinitialize
        validationSchema={validationShema}
        onSubmit={(values) => {
          handleSubmit(values)
        }}
      >
        <Form id='form'>
          <Box w='100%' mt={4} display='flex' flexDirection='column' alignItems='center'>
            <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
              <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Datos Personales</Text>
            </Box>
            <Box mt={4} width='80%'>
              <HStack mb={4} flexDirection={['column', 'column', 'row', 'row']}>
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
              <HStack mb={4} w={['auto', 'auto', '66%']} flexDirection={['column', 'column', 'row', 'row']}>
                <FormControl>
                  <Text>Sexo :</Text>
                  <Field as='select' name='sexo'>
                    <option value='masculino'>Masculino</option>
                    <option value='femenino'>Femenino</option>
                  </Field>
                </FormControl>
                <Spacer />
                <FormControl>
                  <Text>Numero de telefono :</Text>
                  <Field name='phone' />
                </FormControl>
                <Spacer />
              </HStack>
              <HStack mb={4} flexDirection={['column', 'column', 'row', 'row']}>
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
            <Box w='100%' mt={4} display='flex' flexDirection='column' alignItems='center'>
              <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
                <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Solicitud de Examen</Text>
              </Box>
              <Box mt={4} width='80%'>
                {examData && examData.map((exam, index) => {
                  return (
                    <Table fontSize={['.5rem', '1rem']} variant='simple' width='80%' m={4}>
                      <Thead bg='#F4F7FF'>
                        <Tr>
                          <Th w='42%'>Nombre</Th>
                          <Th>Costo</Th>
                          <Th>Eliminar</Th>
                        </Tr>
                      </Thead>

                      <Tbody>
                        {examData && examData.map((exam, index) => (
                          <Tr
                            key={client.id}
                            _hover={{
                              background: 'gray.50'
                            }}
                          >
                            <Td color='#8E9196'>{exam.name}</Td>
                            <Td color='#8E9196'>costo: {exam.price}</Td>
                            <Td textAlign='center' color='#8E9196'><Img cursor='pointer' height='1.2rem' src={deleteIcon} onClick={() => { handleRemoveExamData(exam) }} /></Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  )
                })}
                <HStack justifyContent='end' w='100%' mt={['10px', '10px', '0px']} display='flex'>
                  <ModalTest handleExamData={handleAddExamData} />
                </HStack>
              </Box>
            </Box>
            {path.pathname === '/editar-historia-clinica' &&
              <>
                <Box w='100%' mt={4} display='flex' flexDirection='column' alignItems='center'>
                  <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
                    <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Resultado del Examen</Text>
                  </Box>
                  <Box mt={4} width='80%'>
                    <input type='file' onChange={(e) => setResults_exams({ [e.target.name]: e.target.files[0] })} />
                  </Box>
                </Box>
                <Box w='100%' mb={8} mt={4} display='flex' flexDirection='column' alignItems='center'>
                  <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
                    <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Datos de Pago</Text>
                  </Box>
                  <Box mt={4} width='80%'>
                    <Text mb={4}>Total a pagar: {totalPay}</Text>
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
                            <Text w='25%'>
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
                          <HStack mt={4} />
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
                          <HStack mt={4} />
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Box>

                </Box>
              </>}
            <Box w='100%' mt={4} display='flex' flexDirection='column' alignItems='center'>
              <Box w='85%'>
                <HStack mt={4} w='100%' justifyContent='left'>
                  <Text mb={4} float='left'>Total a pagar: {totalPay}</Text>
                </HStack>
              </Box>
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
