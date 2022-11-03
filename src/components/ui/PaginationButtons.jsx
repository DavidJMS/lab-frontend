import { Flex, Button } from '@chakra-ui/react';

const PaginationButtons = () => {
  return (
    <Flex justifyContent='center'>
      <Button
        colorScheme='blue'
        variant='outline'
        mr={3}
      >
        Anterior
      </Button>
      <Button
        colorScheme='blue'
        variant='outline'
      >
        Siguiente
      </Button>
    </Flex>
  );
}
 
export default PaginationButtons;