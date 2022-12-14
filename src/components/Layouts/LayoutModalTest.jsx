import {
  Text,
  HStack,
  Input,
  Box,
  Image,
  Checkbox
} from '@chakra-ui/react'
import Header from './Header'
import SearchIcon from '../../assets/SearchTest.svg'
import examData from '../../hooks/examData'

const LayoutModalTest = () => {
  const dataExam = examData()
  const title = 'Modal Cliente'
  console.log(dataExam)
  return (
    <Box w='100%' fontSize={['.8rem', '1rem']} display='flex' flexDirection='column' alignItems='center'>
      <HStack w='100%' justifyContent='center' display='flex'>
        <Input className='input--text__borderbottom ' borderRadius='0px' border='0' borderBottom='1.5px solid #D0D0D0' outline='none' background='0px' w='54%' placeholder='text' />
        <Image height='2rem' w={['3rem', '4rem']} src={SearchIcon} />
      </HStack>
      <Box alignItems='center' flexDirection='column' display='flex' w='100%'>
     {dataExam && dataExam.map((exam, i) => (
        <HStack mt={4} w='70%'>
        <HStack border='1px solid #D0D0D0' borderRadius='6px' color='#718096' padding='1rem' w='100%' height='2.5rem'>
          <Text>{exam.name}</Text>
        </HStack>
        <Checkbox/>
      </HStack>
      ))}
     </Box>
    </Box>
  )
}

export default LayoutModalTest
