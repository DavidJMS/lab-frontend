import { Formik, Form } from 'formik'
import {
  Text,
  HStack,
  Image
} from '@chakra-ui/react'
import * as Yup from 'yup'
import SearchIcon from '../../assets/SearchClient.svg'
import { Field } from '../shared/FormFields'

const ClientFilter = ({ getData }) => {
  const validationSchema = Yup.object({
    dni: Yup.string()
      .max(15, 'El máximo de caracteres es de 15')
  })
  return (
    <Formik
      initialValues={{ dni: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmiting }) => {
        getData(values)
      }}
    >
      <Form>
        <HStack w='100%' paddingTop={4}>
          <Text fontSize={['.9rem', '1rem']}>Cédula:</Text>
          <Field w={['50%', 'auto']} name='dni' type='text' />
          <button type='submit' className='button--filter'>
            <Image maxW='4rem' minH='2rem' minW='2rem' width={['3.5rem', '4rem', '7rem']} src={SearchIcon} />
          </button>
        </HStack>
      </Form>
    </Formik>
  )
}

export default ClientFilter
