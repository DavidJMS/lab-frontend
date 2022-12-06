import React from 'react'
import LayoutClient from '../Layouts/LayoutClient'
import {
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure
} from '@chakra-ui/react'
import LayoutModalTest from '../Layouts/LayoutModalTest'

const ModalTest = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('xl')

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  const sizes = ['xl']

  return (
    <>
      <Button bgColor='#D0D0D0' fontSize={['.8rem', '1rem']} mr={8} onClick={() => handleSizeClick(size)}>Agregar</Button>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='1rem' color='#F5F5F5' textAlign='center' w='100%'>Modal Test</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody>
            <LayoutModalTest />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalTest
