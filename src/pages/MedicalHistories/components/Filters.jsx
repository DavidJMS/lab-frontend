import { Formik, Form } from 'formik'
import {
  Text,
  HStack,
  Image
} from '@chakra-ui/react'
import SearchIcon from '../../../assets/SearchClient.svg'
import { Field } from '../../../components/shared/FormFields'
import * as Yup from 'yup'

const Filters = ({ handleSubmit }) => {
  const validationSchema = Yup.object({
    dni: Yup.string()
      .max(15, 'El maximo de caracteres es de 15')
  })

  return (
    <Formik
      initialValues={{ dni: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmiting }) => {
        handleSubmit(values)
      }}
    >
      <Form>
        <HStack mb={4} mt={4}>
          <Text fontSize={['.8rem', '1rem']}>Cedula</Text>
          <Field name='dni' w={['60px', '150px']} />
          <Text fontSize={['.8rem', '1rem']}>Fecha</Text>
          <Field
            w={['60px', '150px']}
            name='date'
          />
          <button type='submit'>
            <Image height='2rem' width={['3.5rem', '4rem', '7rem']} src={SearchIcon} />
          </button>
        </HStack>
      </Form>

    </Formik>
  )
}

export default Filters
