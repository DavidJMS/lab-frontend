// Dependencies
import React, { useState, useEffect } from 'react'
import { Formik, Form, useFormikContext } from 'formik'
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
  Badge,
  InputGroup,
  Switch,
  InputRightAddon
} from '@chakra-ui/react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { RiShareForward2Fill } from 'react-icons/ri'

import CalculateFinancials from '../components/CalculateFinancials'

// Form Components
import { Field } from '../shared/FormFields'

// Modals
import ModalHandleResult from '@/components/modals/ModalHandleResult'
import ModalTest from '../modals/ModalTest'
import ModalCreateFinancials from '../modals/ModalCreateFinancials'
import ModalClient from '../modals/ModalClient'
import ModalPriceTransaction from '../modals/ModalPriceTransaction'

// Assets
import deleteIcon from '../../assets/Delete.svg'
import { AiFillFileText, AiOutlineSearch } from 'react-icons/ai'

// Services
import { createMedical, EditMedicalHistory } from '../../services/medical'
import { deleteTransactions, deletePriceTransaction } from '../../services/financials'
import { deleteResult } from '../../services/results'
import { getClients } from '@/services/clients'

// My Validation Definition to use in form
const validationShema = Yup.object({
  first_names: Yup.string()
    .max(30, 'El máximo de caracteres es de 30')
    .min(3, 'El máximo de caracteres es de 3')
    .required('Requerido!'),
  last_names: Yup.string()
    .max(30, 'El máximo de caracteres es de 30')
    .min(3, 'El máximo de caracteres es de 3')
    .required('Requerido!'),
  email: Yup.string()
    .max(30, 'El máximo de caracteres es de 100')
    .min(3, 'El máximo de caracteres es de 3')
    .email('Introduzca un email válido'),
  dni: Yup.string()
    .max(30, 'El máximo de caracteres es de 30')
    .min(7, 'El máximo de caracteres es de 7')
    .required('Requerido!'),
  age: Yup.number()
    .positive('Inválido')
    .integer('Inválido')
    .required('Requerido!'),
  phone: Yup.string()
    .matches('^[0-9-+]{9,15}$', 'Inválido'),
  address: Yup.string()
    .max(30, 'El máximo de caracteres es de 30'),
  medical_exams: Yup.array()
    .min(1, 'Seleccione un tipo de examen!')
})

const HandleErrorExam = () => {
  const { errors } = useFormikContext()
  return <Text color='#F44336' fontSize='14px'>{errors.medical_exams}</Text>
}

// Main Component
const FormsMedical = ({
  medicalHistory,
  payments,
  priceTransactions,
  getPriceTransactionsById,
  getMedicalPayments,
  price,
  results = [],
  setMedicalHistory,
  getMedicalResults = undefined
}) => {
  // Some utils to use
  const toast = useToast()
  const navigate = useNavigate()
  // Const to handle my statement
  const [loading, setLoading] = useState(true)
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
  const [totalPaid, setTotalPaid] = useState(medicalHistory?.total_paid || 0)
  const [examData, setExamData] = useState(medicalHistory?.medical_exams || [])
  const [deadline, setDeadline] = useState(medicalHistory?.deadline)

  useEffect(() => {
    if ((examData && loading === true) || (userData && loading === true)) {
      setLoading(false)
    }
  }, [])

  const seachClient = async (params) => {
    try {
      if (!params?.dni) {
        toast({
          title: 'Debe de colocar una cédula',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
        return
      }
      const data = await getClients(params)
      console.log(data.results)
      if (data.count) {
        setUserData(data.results[0])
      } else {
        setUserData({
          first_names: '',
          last_names: '',
          email: '',
          dni: '',
          gender: 'Masculino',
          age: '',
          phone: '',
          address: ''
        })
        toast({
          title: 'No encontrado',
          description: 'Esta cédula no existe',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/resultado/${medicalHistory?.id}`)
    toast({
      title: 'Acceso Copiado!',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right'
    })
  }

  // Funtions to handle form data
  const handleAddExamData = (newExams) => {
    let priceToSum = 0
    newExams.forEach(newExam => {
      if (!examData.some((exam) => exam.id === newExam.id)) {
        const priceFormated = parseFloat(newExam.price)
        priceToSum = priceToSum + priceFormated
        setExamData(examData => [...examData, newExam])
      }
    })
    const totalPayOperation = (totalPay + priceToSum).toFixed(2)
    setTotalPay(totalPayOperation)
  }

  const handleRemoveExamData = (props) => {
    const newExamData = examData.filter((exam) => {
      return exam.id !== props.id
    })
    setExamData(newExamData)
    const totalPayOperation = (totalPay - parseFloat(props.price)).toFixed(2)
    setTotalPay(totalPayOperation)
  }

  const handleDeletePayment = async (paymentId) => {
    const res = await deleteTransactions(paymentId)
    if (!res.error) {
      toast({
        title: 'Éxito',
        description: 'Pago eliminado!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
      getMedicalPayments()
      setTotalPaid(res.total_paid)
    } else {
      toast({
        title: 'Éxito',
        description: 'Hubo un error eliminando el pago',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const handleDeletePriceTransaction = async (paymentId) => {
    const resp = await deletePriceTransaction(paymentId)
    if (!resp.error) {
      toast({
        title: 'Éxito',
        description: 'Transaccioón eliminada!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
      getPriceTransactionsById()
      setTotalPay(resp.total_pay)
    } else {
      toast({
        title: 'Error',
        description: 'Hubo un error!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const handleDeleteResult = async (resultId) => {
    const resp = await deleteResult(resultId)
    if (resp) {
      getMedicalResults(
        toast({
          title: 'Éxito',
          description: 'Documento eliminad!',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
      )
    } else {
      toast({
        title: 'Error',
        description: 'Hubo un error!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      const res = medicalHistory ? await EditMedicalHistory(medicalHistory.id, data) : await createMedical(data)
      if (res.error) {
        toast({
          title: 'Exito',
          description: `La historia fue ${medicalHistory ? 'editada' : 'creada'} de manera exitosa`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
        if (!medicalHistory) {
          console.log('sss')
          navigate(`/editar-historia-${res.id}`)
        } else {
          setMedicalHistory(res)
        }
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

  // Rendering...
  if (loading) return <Spinner />
  return (
    <Formik
      initialValues={
          {
            result_sent: medicalHistory?.result_sent || false,
            deadline: medicalHistory?.deadline || null,
            type: medicalHistory?.type || 'Particular',
            with_samples: medicalHistory?.with_samples || false,
            medical_exams: examData ? examData.map(exam => (exam.id)) : '',
            total_pay: totalPay,
            number_id: medicalHistory?.number_id,
            ...userData
          }
        }
      enableReinitialize
      validationSchema={validationShema}
      onSubmit={(values) => {
        if (deadline) {
          if (values.deadline === deadline) delete values.deadline
        }
        handleSubmit(values)
      }}
    >
      {({ values, handleChange }) => (
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
                    <InputGroup>
                      <Field name='dni' />
                      <InputRightAddon onClick={() => seachClient({ dni: values.dni })} children={<AiOutlineSearch />} />
                    </InputGroup>
                  </FormControl>
                </HStack>
                <HStack mb={4} w={['auto', 'auto', '66%']} flexDirection={['column', 'column', 'row', 'row']}>
                  <FormControl>
                    <Text>Sexo:</Text>
                    <Field as='select' name='gender'>
                      <option value='Masculino'>Masculino</option>
                      <option value='Femenino'>Femenino</option>
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
                <HStack justifyContent='end' w='100%' display='flex' mb={2}>
                  <ModalClient setUserData={setUserData} />
                </HStack>
              </Box>
              <Box w='100%' mt={2} display='flex' flexDirection='column' alignItems='center'>
                <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
                  <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Solicitud De Examen</Text>
                </Box>
                <Box mt={4} width={['96%', '80%']}>
                  {examData.length > 0 && (
                    <Table fontSize={['.8rem', '1rem']} variant='simple' width='80%' m={4}>
                      <Thead bg='#F4F7FF'>
                        <Tr fontSize={['.8rem', '1rem']}>
                          <Th w={['30%', '42%']}>Nombre</Th>
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
                            <Td textAlign='center' color='#8E9196'><Img cursor='pointer' height={['1rem', '1.2rem']} src={deleteIcon} onClick={() => { handleRemoveExamData(exam) }} /></Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  )}
                  {/* <Field name='medical_exams' /> */}
                  <HandleErrorExam />
                  <HStack justifyContent='end' w={['90%', '100%']} mt={['10px', '10px', '0px']} display='flex'>
                    <ModalTest handleExamData={handleAddExamData} exams={examData} />
                  </HStack>
                </Box>
              </Box>
              <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%' mt={4}>
                <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Datos Generales</Text>
              </Box>
              <Box mt={4} width='80%'>
                <HStack mb={4} flexDirection={['column', 'column', 'row', 'row']}>
                  <FormControl>
                    <Text>Tipo de Solicitud:</Text>
                    <Field as='select' name='type'>
                      <option value='Particular'>Particular</option>
                      <option value='Hospitalizado'>Hospitalizado</option>
                    </Field>
                  </FormControl>
                  <FormControl>
                    <Text>Cambiar fecha de entrega:</Text>
                    <Field
                      name='deadline' type='datetime-local'
                    />
                  </FormControl>
                </HStack>
                {medicalHistory &&
                  <HStack mb={4} flexDirection={['column', 'column', 'row', 'row']}>
                    <FormControl>
                      <Text mb={4} float='left'>Número:</Text>
                      <Field
                        name='number_id'
                      />
                    </FormControl>
                  </HStack>}
              </Box>
              <Box w='80%' mt={4} display='flex' flexDirection='column'>
                <HStack w='100%' justifyContent='left' fontSize={18}>
                  {totalPay && <CalculateFinancials totalPaid={totalPaid} totalPay={totalPay} priceBs={parseFloat(price?.price)} />}
                </HStack>
                <HStack w='100%' justifyContent='left' fontSize={18} marginTop={4}>
                  {totalPay &&
                    <Text mb={4} float='left'>Total a pagar:
                      <Badge fontSize={15} ml={1}>{totalPay}$ </Badge>
                      <Badge fontSize={15} ml={1}>{(totalPay * parseFloat(price.price)).toFixed(2)} Bs </Badge>
                    </Text>}
                </HStack>
                <HStack w='100%' justifyContent='left' fontSize={18}>
                  {totalPaid &&
                    <Text mb={4} float='left'>Total pagado:
                      <Badge fontSize={15} ml={1}>{totalPaid}$ </Badge>
                      <Badge fontSize={15} ml={1}>{(totalPaid * parseFloat(price.price)).toFixed(2)} Bs </Badge>
                    </Text>}
                </HStack>
                <HStack w='100%' justifyContent='left' fontSize={18}>
                  {values.deadline &&
                    <Text mb={4} float='left'>Fecha de entrega:
                      <Badge fontSize={15} ml={1}>{values.deadline}</Badge>
                    </Text>}
                </HStack>
                <HStack w='100%' justifyContent='left' fontSize={18}>
                  <Text mb={1} float='left'>Muestras Tomadas:</Text>
                  <Switch colorScheme='blue' isChecked={values.with_samples} name='with_samples' onChange={(e) => { handleChange(e) }} />
                </HStack>
                {medicalHistory &&
                  <HStack w='100%' justifyContent='left' fontSize={18}>
                    <Text mb={1} float='left'>Resultados entregados:</Text>
                    <Switch colorScheme='blue' isChecked={values.result_sent} name='result_sent' onChange={(e) => { handleChange(e) }} />
                  </HStack>}
                <HStack justifyContent='left' fontSize={18} />
                <HStack justifyContent='left' fontSize={18}>
                  {medicalHistory &&
                    <Text mb={4} float='left'>Código de acceso:
                      <Badge fontSize={15} ml={1}>
                        {medicalHistory?.code}
                      </Badge>
                    </Text>}
                </HStack>
                <HStack justifyContent='left' fontSize={18}>
                  {medicalHistory &&
                    <>
                      <Text float='left'> Link de Acceso
                      </Text> <RiShareForward2Fill onClick={handleCopyLink} />
                    </>}
                </HStack>
              </Box>
              {medicalHistory &&
                <>
                  <Box w='100%' mb={8} mt={2} display='flex' flexDirection='column' alignItems='center'>
                    <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
                      <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Datos de Pago</Text>
                    </Box>
                    <Box mt={4} width={['96%', '96%', '80%', '80%']}>
                      {payments.length > 0 && (
                        <Table fontSize={['.5rem', '1rem']} variant='simple' width='100%' m={4}>
                          <Thead bg='#F4F7FF'>
                            <Tr>
                              <Th>Bolivares</Th>
                              <Th>Dolares</Th>
                              <Th>Divisa</Th>
                              <Th>Método</Th>
                              <Th>Tipo</Th>
                              <Th>Referencia</Th>
                              <Th>Fecha</Th>
                              <Th>Acciones</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {payments.map((payment, index) => (
                              <Tr
                                textAlign='center'
                                key={index}
                                _hover={{
                                  background: 'gray.50'
                                }}
                              >
                                <Td color='#8E9196'>{payment.amount_bolivares}</Td>
                                <Td>{payment.amount_dollars}</Td>
                                <Td color='#8E9196'>{payment.divisa}</Td>
                                <Td color='#8E9196'>{payment.method_payment}</Td>
                                <Td color='#8E9196'>{payment.type}</Td>
                                <Td color='#8E9196'>{payment.number_ref || 'No Aplica'}</Td>
                                <Td color='#8E9196'>{payment.create_at || 'No Aplica'}</Td>
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
                          totalPaid={totalPaid}
                          totalPay={totalPay}
                          setTotalPaid={setTotalPaid}
                        />
                      </HStack>
                    </Box>
                  </Box>
                  <Box w='100%' mb={8} mt={2} display='flex' flexDirection='column' alignItems='center'>
                    <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
                      <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Descuentos - Aumentos</Text>
                    </Box>
                    <Box mt={4} width={['96%', '96%', '80%', '80%']}>
                      {priceTransactions.length > 0 && (
                        <Table fontSize={['.5rem', '1rem']} variant='simple' width='100%' m={4}>
                          <Thead bg='#F4F7FF'>
                            <Tr>
                              <Th>Tasa</Th>
                              <Th>Bolivares</Th>
                              <Th>Dolares</Th>
                              <Th>Concepto</Th>
                              <Th>Fecha</Th>
                              <Th>Eliminar</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {priceTransactions.map((transaction, index) => (
                              <Tr
                                textAlign='center'
                                key={index}
                                _hover={{
                                  background: 'gray.50'
                                }}
                              >
                                <Td color='#8E9196'>{transaction.price}</Td>
                                <Td color='#8E9196'>{transaction.amount_bolivares}</Td>
                                <Td color='#8E9196'>{transaction.amount_dollars}</Td>
                                <Td color='#8E9196'>{transaction.concept}</Td>
                                <Td color='#8E9196'>{transaction.create_at || 'No Aplica'}</Td>
                                <Td textAlign='center' color='#8E9196'><Img cursor='pointer' height='1.2rem' src={deleteIcon} onClick={() => { handleDeletePriceTransaction(transaction.id) }} /></Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      )}
                      <HStack justifyContent='end' w='100%' mt={['10px', '10px', '0px']} display='flex'>
                        <ModalPriceTransaction
                          price={parseFloat(price?.price)}
                          priceId={price?.id}
                          medicalId={medicalHistory?.id}
                          setTotalPay={setTotalPay}
                          totaltoPay={totalPay - totalPaid}
                          getPriceTransactionsById={getPriceTransactionsById}
                        />
                      </HStack>
                    </Box>
                  </Box>
                  <Box w='100%' mt={2} display='flex' flexDirection='column' alignItems='center'>
                    <Box backgroundColor='#0DA7D9' height='2.5rem' borderRadius='5px' w='85%'>
                      <Text fontSize='1.5rem' color='#FFFF' textAlign='center'>Resultado del Examen</Text>
                    </Box>
                    <Box mt={4} width='80%'>
                      {results.length > 0 && (
                        <Table fontSize={['.5rem', '1rem']} variant='simple' width='80%' m={4}>
                          <Thead bg='#F4F7FF'>
                            <Tr>
                              <Th>Nombre</Th>
                              <Th>Archivo</Th>
                              <Th>Acciones</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {results.map((result, index) => (
                              <Tr
                                key={index}
                                _hover={{
                                  background: 'gray.50'
                                }}
                              >
                                <Td color='#8E9196'>{result.name}</Td>
                                <Td>
                                  <a href={result.document} target='blank'>
                                    <AiFillFileText size='1.8rem' color='#0DA7D9' />
                                  </a>
                                </Td>
                                <Td textAlign='center' color='#8E9196'>
                                  <Img cursor='pointer' height='1.2rem' src={deleteIcon} onClick={() => { handleDeleteResult(result.id) }} />
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      )}
                      <HStack justifyContent='end' w='100%' mt={['10px', '10px', '0px']} display='flex'>
                        <ModalHandleResult
                          getMedicalResults={getMedicalResults}
                          medicalId={medicalHistory?.id}
                          price={parseFloat(price?.price)}
                          priceId={price.id}
                        />
                      </HStack>
                    </Box>
                  </Box>
                </>}
              <HStack mt={4} w='100%' justifyContent='center'>
                <Button mb={8} w='20%' type='submit'>{medicalHistory ? 'Editar' : 'Crear'}</Button>
              </HStack>
            </Box>
        </Form>
      )}
    </Formik>
  )
}

export default FormsMedical
