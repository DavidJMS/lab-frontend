import { Formik, Form } from 'formik'
import {
  Text,
  HStack,
  Button
} from '@chakra-ui/react'
import { Field } from '../shared/FormFields'
import * as Yup from 'yup'

const ExamenFilter = ({ handleSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, 'El maximo de caracteres es de 50')
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
        <HStack w='90%' display='flex' mt={4} justifyContent='center'>
          <Text m='2'>Examen</Text>
          <Field m='2' name='name' w='100%' type='text' />
          <Button m='2' backgroundColor='#D0D0D0' type='submit'>Buscar</Button>
        </HStack>
      </Form>
    </Formik>
  )
}

export default ExamenFilter
