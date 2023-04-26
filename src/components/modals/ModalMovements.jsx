import React from 'react'
import {
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Box
} from '@chakra-ui/react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import TableFinancials from '../ui/TableFinancials'

const ModalMovements = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('full')

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  return (
    <>
      <Button
        bgColor='white'
        color='black'
        mr={8}
        onClick={() => handleSizeClick(size)}
      >
        <AiOutlineUnorderedList />
      </Button>

      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='1rem' color='#F5F5F5' textAlign='center' w='100%'>Movimientos</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody w='100%'>
            <Box>
              <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
                <TableFinancials data={data} />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalMovements
