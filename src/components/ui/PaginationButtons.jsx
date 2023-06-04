import { Flex, Button } from '@chakra-ui/react'

const PaginationButtons = ({ setNumberPagination }) => {
  return (
    <Flex
      justifyContent='center'
    >
      <Button
        colorScheme='blue'
        mr={3}
        fontSize={{ base: '12px', md: '16px' }}
        onClick={() => { setNumberPagination(-1) }}
        backgroundColor='white'
        color='#0DA7D9'
        border='1px solid #0DA7D9'
        _hover={{
          color: 'white',
          backgroundColor: '#0DA7D9',
          border: '1px solid white'
        }}
      >
        Anterior
      </Button>
      <Button
        fontSize={{ base: '12px', md: '16px' }}
        colorScheme='blue'
        onClick={() => { setNumberPagination(+1) }}
        backgroundColor='white'
        color='#0DA7D9'
        border='1px solid #0DA7D9'
        _hover={{
          color: 'white',
          backgroundColor: '#0DA7D9',
          border: '1px solid white'
        }}
      >
        Siguiente
      </Button>
    </Flex>
  )
}

export default PaginationButtons
