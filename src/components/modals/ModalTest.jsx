import React from 'react'
import LayoutClient from '../Layouts/LayoutClient'
import {
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure
} from '@chakra-ui/react'
import LayoutTest from '../Layouts/LayoutTest'

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
      <Button bgColor='#D0D0D0' mr={8} onClick={() => handleSizeClick(size)}>Agregar</Button>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='1rem' color='#F5F5F5' textAlign='center' w='100%'>Modal Title</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody>
            <LayoutTest />
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
