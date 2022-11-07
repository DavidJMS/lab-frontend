import {
  Text,
  Box
} from '@chakra-ui/react'

const Header = ({ title }) => {
  return (
    <Box bgColor='#0DA7D9' textAlign='center' width='100%' height='3rem'>
      <Text color='#F5F5F5' fontWeight='500' fontSize='1.5rem'>{title}</Text>
    </Box>
  )
}

export default Header
