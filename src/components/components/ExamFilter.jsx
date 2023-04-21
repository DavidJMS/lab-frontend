import { Formik, Form } from 'formik'
import {
  Image, HStack,
  Button
} from '@chakra-ui/react'
import { Field } from '../shared/FormFields'
import * as Yup from 'yup'
import SearchIcon from '@/assets/SearchClient.svg'

const ExamenFilter = ({ handleSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, 'El máximo de caracteres es de 50')
  })

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmiting }) => {
        handleSubmit(values)
      }}
    >
      <Form>
        <HStack w='90%' display='flex' justifyContent='center'>
          <Field mx='2' name='name' w='100%' type='text' placeholder='Nombre del examen' />
          <button type='submit' className='button--filter'>
            <Image maxW='4rem' minH='2rem' minW='2rem' width={['3.5rem', '4rem', '7rem']} src={SearchIcon} />
          </button>
        </HStack>
      </Form>
    </Formik>
  )
}

export default ExamenFilter
