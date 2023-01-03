import { Formik, Form, Field } from 'formik'
import {
  Text,
  HStack,
  Image
} from '@chakra-ui/react'
import * as Yup from 'yup'
import SearchIcon from '../../assets/SearchClient.svg'

const ClientFilter = ({ getData }) => {
  const validationSchema = Yup.object({
    dni: Yup.string()
      .max(15, 'El maximo de caracteres es de 15')
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
        <HStack w='100%' padding={4}>
          <Text fontSize={['.9rem', '1rem']}>Cedula :</Text>
          <Field placeholder='' w={['50%', 'auto']} name='dni' />
          <button type='submit'>
            <Image height='2rem' w={['3.5rem', 'auto']} src={SearchIcon} />
          </button>
        </HStack>
      </Form>
    </Formik>
  )
}

export default ClientFilter
