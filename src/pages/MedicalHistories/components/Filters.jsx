import { Formik, Form } from 'formik'
import {
  HStack,
  Image,
  FormControl,
  Text,
  Flex,
  Box
} from '@chakra-ui/react'
import SearchIcon from '../../../assets/SearchClient.svg'
import { Field } from '../../../components/shared/FormFields'
import * as Yup from 'yup'

const Filters = ({ handleSubmit }) => {
  const validationSchema = Yup.object({
    dni: Yup.string()
      .max(15, 'El máximo de caracteres es de 15'),
    number_id: Yup.number(),
    with_samples: Yup.string().oneOf(
      ['false', 'true', 'ninguno', undefined],
      'Invalido'
    )
  })
  return (
    <Formik
      initialValues={{ dni: '', number_id: '', with_samples: 'ninguno', date: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmiting }) => {
        handleSubmit(values)
      }}
    >
      <Form className='form--medical__history'>
        <HStack
          mb={4}
          mt={4}
          w='100%'
          flexDirection={['column', 'column', 'row', 'row']}
        >
          <FormControl display='inline-flex'>
            <Field
              name='dni'
              placeholder='Cédula'
              my='0.5rem'
              mr='5px'
            />
            <Field
              name='number_id'
              placeholder='Número'
              my='0.5rem'
            />
          </FormControl>
          <FormControl w={['100%', '100%', '50%']}>
            <Field
              w={['100%', '100%', 'auto']}
              name='date'
              my='0.5rem'
              type='date'
            />
          </FormControl>
        </HStack>
        <Flex
          mb={4}
          mt={4}
          alignItems='center'
        >
          <Flex alignItems='center'>
            <Text mx='1rem'>Muestra</Text>
            <Field
              as='select'
              name='with_samples'
              w='100px'
              h='45px'
              marginRight='10px'
            >
              <option value='true'>Si</option>
              <option value='false'>No</option>
              <option value='ninguno'>Ninguno</option>
            </Field>
          </Flex>
          <button type='submit' className='button--filter'>
            <Image maxW='4rem' minH='2rem' minW='2rem' src={SearchIcon} />
          </button>
        </Flex>
      </Form>
    </Formik>
  )
}

export default Filters
