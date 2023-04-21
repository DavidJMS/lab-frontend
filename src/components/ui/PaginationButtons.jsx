import { Flex, Button } from '@chakra-ui/react'

const PaginationButtons = ({ setNumberPagination }) => {
  return (
    <Flex justifyContent='center'>
      <Button
        colorScheme='blue'
        variant='outline'
        mr={3}
        onClick={() => { setNumberPagination(-1) }}
      >
        Anterior
      </Button>
      <Button
        colorScheme='blue'
        onClick={() => { setNumberPagination(+1) }}
        variant='outline'
      >
        Siguiente
      </Button>
    </Flex>
  )
}

export default PaginationButtons
