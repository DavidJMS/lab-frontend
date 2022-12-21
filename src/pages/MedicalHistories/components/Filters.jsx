import { Formik, Form } from 'formik'
import {
  Text,
  HStack,
  Image,
  FormControl
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
      initialValues={{ dni: '', date: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmiting }) => {
        console.log(values)
        handleSubmit(values)
      }}
    >
      <Form className='form--medical__history'>
        <HStack mb={4} mt={4} w={['100%', '100%', '84%', '84%']} flexDirection={['column', 'column', 'row', 'row']} >
          <FormControl w={['90%', '100%']}>
          <Text fontSize={['.8rem', '1rem']}>Cedula</Text>
          <Field name='dni' w={['85%', 'auto']} />
          </FormControl>
          <FormControl w={['90%', '100%']}>
          <Text fontSize={['.8rem', '1rem']}>Fecha</Text>
          <HStack w={['100%', '80%']}>
          <Field
            w={['100%', 'auto']}
            name='date'
            type='date'
          />
          <button type='submit' className='button--filter'>
            <Image maxW={'4rem'} minH={'2rem'} minW={'2rem'} width={['3.5rem', '4rem', '7rem']} src={SearchIcon} />
          </button>
          </HStack>
          </FormControl>
        </HStack>
      </Form>

    </Formik>
  )
}

export default Filters
