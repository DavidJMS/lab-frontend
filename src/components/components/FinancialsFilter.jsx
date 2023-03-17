import { Formik, Form } from 'formik'
import {
  Text,
  HStack,
  Image,
  FormControl
} from '@chakra-ui/react'
import SearchIcon from '../../assets/SearchClient.svg'
import { Field } from '../shared/FormFields'

const FinancialsFilter = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        typeFilter: 'dia',
        date: new Date().toISOString().split('T')[0],
        range__start: new Date().toISOString().split('T')[0],
        range__end: new Date().toISOString().split('T')[0]
      }}
      onSubmit={(values, { setSubmiting }) => {
        handleSubmit(values)
      }}
    >
      {({ values }) => (
        <Form className='form--medical__history'>
          <HStack mb={4} mt={4} w={['100%', '100%', '84%', '84%']} flexDirection={['column', 'column', 'row', 'row']}>
            <FormControl w={['90%', '30%']}>
              <Text fontSize={['.8rem', '1rem']}>Tipo de buscador</Text>
              <Field as='select' name='typeFilter'>
                <option value='dia'>Por Dia</option>
                <option value='range'>Por Rango</option>
              </Field>
            </FormControl>
            {values.typeFilter === 'dia'
              ? <FormControl w={['90%', '100%']}>
                <Text fontSize={['.8rem', '1rem']}>Fecha</Text>
                <HStack w={['100%', '80%']}>
                  <Field
                    w={['100%', 'auto']}
                    name='date'
                    type='date'
                    value={values.date}
                  />
                  <button type='submit' className='button--filter'>
                    <Image maxW='4rem' minH='2rem' minW='2rem' width={['3.5rem', '4rem', '7rem']} src={SearchIcon} />
                  </button>
                </HStack>
                </FormControl>
              : <>
                <FormControl w={['90%', '100%']}>
                  <Text fontSize={['.8rem', '1rem']}>Desde</Text>
                  <HStack w={['100%', '80%']}>
                    <Field
                      w={['100%', 'auto']}
                      name='range__start'
                      type='date'
                    />
                  </HStack>
                </FormControl>
                <FormControl w={['90%', '100%']}>
                  <Text fontSize={['.8rem', '1rem']}>Hasta</Text>
                  <HStack w={['100%', '80%']}>
                    <Field
                      w={['100%', 'auto']}
                      name='range__end'
                      type='date'
                    />
                    <button type='submit' className='button--filter'>
                      <Image maxW='4rem' minH='2rem' minW='2rem' width={['3.5rem', '4rem', '7rem']} src={SearchIcon} />
                    </button>
                  </HStack>
                </FormControl>
                </>}
          </HStack>
        </Form>
      )}
    </Formik>
  )
}

export default FinancialsFilter
