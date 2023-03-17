import React from 'react'
import {
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, Image, Box, Text
} from '@chakra-ui/react'
import { FcFolder } from 'react-icons/fc'

// Assets
import backgroundImg from '@/assets/background.jpg'
import logo from '@/assets/logo3.jpg'

export default function ShowResults ({ results, isOpen, onClose }) {
  return (
    <>
      <Image src={backgroundImg} height='100vh' width='100%' />
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        size='lg'
        isCentered
        motionPreset
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='#0DA7D9' textAlign='center' w='100%'>
            <Image mb='.5rem' src={logo} />
            Resultados de {results?.medical_history?.client?.full_name}
          </ModalHeader>
          <ModalBody />
          <Box p='0px 4rem 2rem 4rem' display='flex'>
            {results?.results && results?.results.map((result) => (
              <Box key={result.id} m='0 10px'>
                <FcFolder size='3rem' />
                <Text>{result.name}</Text>
              </Box>
            ))}
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
