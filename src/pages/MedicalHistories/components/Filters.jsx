import { Formik, Form } from 'formik'
import {
  HStack,
  Image,
  FormControl,
  Text
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
          w={['100%', '100%', '100%', '100%']}
          flexDirection={['column', 'column', 'row', 'row']}
        >
          <FormControl display='inline-flex'>
          <Field as='select' name='dni'>
            <option value='dni'>Cédula</option>
            <option value='number_id'>Número</option>
          </Field>
            {/* <Field
              name='dni'
              placeholder='Cédula'
              my='0.5rem'
              mr='5px'
            />
            <Field
              name='number_id'
              placeholder='Número'
              my='0.5rem'
            /> */}
          </FormControl>
          <FormControl display={['block', 'bloack', 'inline-flex', 'inline-flex']} px='1rem'>
            <Text fontSize='.8rem'> Filtrar por muestra</Text>
            <Field as='select' name='with_samples' w='fit-content'>
              <option value='true'>Si</option>
              <option value='false'>No</option>
              <option value='ninguno'>Ninguno</option>
            </Field>
          </FormControl>
          <FormControl w={['100%', '100%', '50%']}>
            <Field
              w={['100%', '100%', 'auto']}
              name='date'
              my='0.5rem'
              type='date'
            />
          </FormControl>
          <FormControl w={['90%', '100%']} float={{ base: 'right', md: 'none' }}>
            <button type='submit' className='button--filter'>
              <Image maxW='4rem' minH='2rem' minW='2rem' width={['3.5rem', '4rem', '7rem']} src={SearchIcon} />
            </button>
          </FormControl>
        </HStack>
      </Form>
    </Formik>
  )
}

export default Filters
