import {
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Box,
  Flex,
  Image,
  useMediaQuery
} from '@chakra-ui/react'
import SearchIcon from '../../assets/SearchClient.svg'
import { Formik } from 'formik'
import { Field } from '../shared/FormFields'
import ModalTest from '../modals/ModalTest'

const TableMedicalHistory = ({ data }) => {
  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
  return (
    <>
      <Formik>
        <Box w={['100%', '100%', '100%']} display='flex' flexDirection='column' alignItems='center'>
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
          <Box width={['40%', '80%', '100%']} display='flex' flexDirection={['row', 'row', 'row', 'row']} justifyContent='center'>
            <Table fontSize={['.8rem', '1rem']} variant='simple' width='70%' m={4}>
              {IsNotSmallScreen && <Thead bg='#F4F7FF'>
                <Tr>
                  <Th>Nombre y Apellido</Th>
                  <Th>Cedula</Th>
                  <Th>Fecha</Th>
                </Tr>
                                   </Thead>}
              <Tbody>
                {data && data.map((medical) => {
                  return (
                    <Tr>
                      <Td><Text color='#8E9196'>{medical?.client?.full_name}</Text></Td>
                      <Td><Text color='#8E9196'>{medical?.client?.dni}</Text></Td>
                      <Td><Text color='#8E9196'>{medical.create_at}</Text></Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Formik>
    </>
  )
}

export default TableMedicalHistory
