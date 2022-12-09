import { Formik } from 'formik'
import {
  Text,
  HStack,
  Flex,
  Image
} from '@chakra-ui/react'
import SearchIcon from '../../../assets/SearchClient.svg'
import { Field } from '../../../components/shared/FormFields'
import ModalTest from '../../../components/modals/ModalTest'

const Filters = ({ data }) => {
  return (
    <Formik>
      <Flex flexDirection={['colum', 'row']} justifyContent='space-around' w='82%'>
        <HStack mb={4} mt={4}>
          <Text fontSize={['.8rem', '1rem']}>Cedula</Text>
          <Field name='name' w={['60px', '150px']} />
          <Text fontSize={['.8rem', '1rem']}>Fecha</Text>
          <Field
            w={['60px', '150px']}
            name='date'
          />
          <Image height='2rem' width={['3.5rem', '4rem', '7rem']} src={SearchIcon} />
        </HStack>
        <HStack mb={4} mt={4} />
        <HStack width={['90px', '100px']} position='relative' mt={['100px', '100px', '0px']}>
          <ModalTest />
        </HStack>
      </Flex>
    </Formik>
  )
}

export default Filters
