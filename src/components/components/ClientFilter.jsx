import { Formik, Form } from 'formik'
import {
  Flex,
  Image
} from '@chakra-ui/react'
import * as Yup from 'yup'
import SearchIcon from '../../assets/SearchClient.svg'
import { Field } from '../shared/FormFields'

const ClientFilter = ({ getData }) => {
  const validationSchema = Yup.object({
    dni: Yup.string()
      .max(15, 'El máximo de caracteres es de 15'),
    first_names: Yup.string()
      .max(30, 'El máximo de caracteres es de 30'),
    last_names: Yup.string()
      .max(30, 'El máximo de caracteres es de 30')
  })
  return (
    <Formik
      initialValues={{ dni: '', first_names: '', last_names: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmiting }) => {
        getData(values)
      }}
    >
      <Form>
        <Flex flexDirection={{ base: 'column-reverse', md: 'row' }} paddingTop='20px' w={{ base: '100%', md: 'fit-content' }}>
          <Field w={{ base: '100%', md: 'fit-content' }} m='2.5px' name='dni' type='text' placeholder='Cédula' />
          <Field w={{ base: '100%', md: 'fit-content' }} m='2.5px' name='first_names' type='text' placeholder='Nombres' />
          <Field w={{ base: '100%', md: 'fit-content' }} m='2.5px' name='last_names' type='text' placeholder='Apellidos' />
          <Flex m='2.5px' justifyContent='end'>
            <button type='submit' className='button--filter'>
              <Image maxW='4rem' minH='2rem' minW='2rem' width={['188.5rem', '4rem', '7rem']} src={SearchIcon} />
            </button>
          </Flex>
        </Flex>
      </Form>
    </Formik>
  )
}

export default ClientFilter
