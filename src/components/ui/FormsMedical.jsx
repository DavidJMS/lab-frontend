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
  Spinner,
  Img,
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
  Th,
  Badge
} from '@chakra-ui/react'
import ModalClient from '../modals/ModalClient'
import { Field } from '../shared/FormFields'
import ModalTest from '../modals/ModalTest'
import * as Yup from 'yup'
import deleteIcon from '../../assets/Delete.svg'
import ModalCreateFinancials from '../modals/ModalCreateFinancials'
import { useNavigate } from 'react-router-dom'

// services
import { createMedical } from '../../services/medical'
import { deletePayments } from '../../services/financials'

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

const FormsMedical = ({
  medicalHistory,
  payments,
  getMedicalPayments,
  price
}) => {
  // Some utils to use
  const toast = useToast()
  const navigate = useNavigate()
  // Const to handle my statement
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    first_names: medicalHistory?.client?.first_names || '',
    last_names: medicalHistory?.client?.last_names || '',
    email: medicalHistory?.client?.email || '',
    dni: medicalHistory?.client?.dni || '',
    gender: medicalHistory?.client?.dni || 'Masculino',
    age: medicalHistory?.client?.age || '',
    phone: medicalHistory?.client?.phone || '',
    address: medicalHistory?.client?.address || ''
  })
  const [totalPay, setTotalPay] = useState(medicalHistory?.total_pay || 0)
  const [examData, setExamData] = useState(medicalHistory?.medical_exams || [])
  const [results_exams, setResults_exams] = useState()// This only use if components is used in edit page

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

  // Funtions to hanlde form data
  const handleAddExamData = (newExams) => {
    let priceToSum = 0
    newExams.forEach(newExam => {
      if (!examData.some((exam) => exam.id === newExam.id)) {
        const priceFormated = parseFloat(newExam.price)
        priceToSum = priceToSum + priceFormated
        setExamData(examData => [...examData, newExam])
      }
    })
    setTotalPay(totalPay + priceToSum)
  }

  const handleRemoveExamData = (props) => {
    const newExamData = examData.filter((exam) => {
      return exam.id !== props.id
    })
    setExamData(newExamData)
    setTotalPay(totalPay - parseFloat(props.price))
  }

  const handleDeletePayment = async (paymentId) => {
    const resp = await deletePayments(paymentId)
    if (resp) getMedicalPayments()
  }

  const handleFileChange = (e) => setResults_exams({ ...Form, [e.target.name]: e.target.files[0] })

  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      const res = await createMedical(data)
      if (res) {
        toast({
          title: 'Exito',
          description: 'Cliente creado de manera exitosa',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
        navigate('/')
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
              <HStack mb={4} w={['auto', 'auto', '66%']} flexDirection={['column', 'column', 'row', 'row']}>
                <FormControl>
                  <Text>Sexo:</Text>
                  <Field as='select' name='sexo'>
                    <option value='masculino'>Masculino</option>
                    <option value='femenino'>Femenino</option>
                  </Field>
                </FormControl>
                <Spacer />
                <FormControl>
                  <Text>Teléfono:</Text>
                  <Field name='phone' />
                </FormControl>
                <Spacer />
              </HStack>
              <HStack mb={4} flexDirection={['column', 'column', 'row', 'row']}>
                <FormControl>
                  <Text>Dirección:</Text>
                  <Field name='address' />
                </FormControl>
                <FormControl>
                  <Text>Correo:</Text>
                  <Field name='email' />
                </FormControl>
                <FormControl>
                  <Text>Edad:</Text>
                  <Field
                    type='number'
                    name='age'
                    min='1'
                    max='120'
                  />
                </FormControl>
              </HStack>
              <HStack justifyContent='end' w='100%' display='flex'>
                <ModalClient setUserData={setUserData} />
              </HStack>
            </Box>
            <Box w='100%' mt={4} display='flex' flexDirection='column' alignItems='center'>
              <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
                <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Solicitud De Examen</Text>
              </Box>
              <Box mt={4} width='80%'>
                {examData.length > 0 && (
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
                          key={exam.id}
                          _hover={{
                            background: 'gray.50'
                          }}
                        >
                          <Td color='#8E9196'>{exam.name}</Td>
                          <Td color='#8E9196'>{exam.price}</Td>
                          <Td textAlign='center' color='#8E9196'><Img cursor='pointer' height='1.2rem' src={deleteIcon} onClick={() => { handleRemoveExamData(exam) }} /></Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                )}
                <HStack justifyContent='end' w='100%' mt={['10px', '10px', '0px']} display='flex'>
                  <ModalTest handleExamData={handleAddExamData} exams={examData} />
                </HStack>
              </Box>
            </Box>
            {medicalHistory &&
              <>
                <Box w='100%' mb={8} mt={4} display='flex' flexDirection='column' alignItems='center'>
                  <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
                    <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Datos de Pago</Text>
                  </Box>
                  <Box mt={4} width='80%'>
                    {payments.length > 0 && (
                      <Table fontSize={['.5rem', '1rem']} variant='simple' width='80%' m={4}>
                        <Thead bg='#F4F7FF'>
                          <Tr>
                            <Th w='42%'>Monto</Th>
                            <Th>Tipo de pago</Th>
                            <Th>Referencia</Th>
                            <Th>Acciones</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {payments.map((payment, index) => (
                            <Tr
                              key={index}
                              _hover={{
                                background: 'gray.50'
                              }}
                            >
                              <Td color='#8E9196'>{payment.amount}</Td>
                              <Td color='#8E9196'>{payment.method_payment}</Td>
                              <Td color='#8E9196'>{payment.number_ref || 'No Aplica'}</Td>
                              <Td textAlign='center' color='#8E9196'><Img cursor='pointer' height='1.2rem' src={deleteIcon} onClick={() => { handleDeletePayment(payment.id) }} /></Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    )}
                    <HStack justifyContent='end' w='100%' mt={['10px', '10px', '0px']} display='flex'>
                      <ModalCreateFinancials
                        getMedicalPayments={getMedicalPayments}
                        medicalId={medicalHistory?.id}
                        price={parseFloat(price?.price)}
                        priceId={price.id}
                      />
                    </HStack>
                  </Box>
                </Box>
                <Box w='100%' mt={4} display='flex' flexDirection='column' alignItems='center'>
                  <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
                    <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Resultado del Examen</Text>
                  </Box>
                  <Box mt={4} width='80%'>
                    <input type='file' onChange={(e) => setResults_exams({ [e.target.name]: e.target.files[0] })} />
                  </Box>
                </Box>
              </>}
            <Box w='100%' mt={4} display='flex' flexDirection='column' alignItems='center'>
              <Box w='85%'>
                <HStack mt={4} w='100%' justifyContent='left'>
                  {totalPay &&
                    <Text mb={4} float='left'>Total a pagar:
                      <Badge ml={1}>{totalPay}$ </Badge>
                      <Badge ml={1}>{totalPay * parseFloat(price.price)}Bs </Badge>
                    </Text>}
                </HStack>
              </Box>
            </Box>
            <HStack mt={4} w='100%' justifyContent='center'>
              <Button mb={8} w='20%' type='submit'>Crear</Button>
            </HStack>
          </Box>
        </Form>
      </Formik>
    </>
  )
}

export default FormsMedical
