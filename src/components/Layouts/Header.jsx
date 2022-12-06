import {
  Text,
  Box,
} from '@chakra-ui/react'
import Example from '../components/Menu'

const Header = ({ title }) => {
  return (
    <Box bgColor='#0DA7D9' display='flex' justifyContent='space-between' alignItems='center' width='100%' height='3rem'>
      <Text ml={4} color='#F5F5F5' fontWeight='500' fontSize={['.8rem','1.5rem']}>{title}</Text>
      <Example />
    </Box>
  )
}

export default Header
