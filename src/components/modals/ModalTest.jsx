import React from 'react'
import LayoutClient from '../Layouts/LayoutClient'
import {
  Modal, ModalOverlay, ModalContent, Box, Input, Checkbox, HStack, Image, Text,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure
} from '@chakra-ui/react'
import LayoutModalTest from '../Layouts/LayoutModalTest'
import examData from '../../hooks/examData'
import SearchIcon from '../../assets/SearchTest.svg'

const ModalTest = ({ handleExamData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dataExam = examData()
  const [size, setSize] = React.useState('xl')

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }
  const passData = (exam) => {
    console.log(exam)
    handleExamData(exam)
  }

  return (
    <>
      <Button bgColor='#D0D0D0' fontSize={['.8rem', '1rem']} mr={8} onClick={() => handleSizeClick(size)}>Agregar</Button>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='1rem' color='#F5F5F5' textAlign='center' w='100%'>Examenes</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody>
            <Box w='100%' fontSize={['.8rem', '1rem']} display='flex' flexDirection='column' alignItems='center'>
              <HStack w='100%' justifyContent='center' display='flex'>
                <Input className='input--text__borderbottom ' borderRadius='0px' border='0' borderBottom='1.5px solid #D0D0D0' outline='none' background='0px' w='54%' placeholder='text' />
                <Image height='2rem' w={['3rem', '4rem']} src={SearchIcon} />
              </HStack>
              <Box alignItems='center' flexDirection='column' display='flex' w='100%'>
                {dataExam && dataExam.map((exam, i) => (
                  <HStack key={i} mt={4} w='70%'>
                    <HStack border='1px solid #D0D0D0' borderRadius='6px' color='#718096' padding='1rem' w='100%' height='2.5rem'>
                      <Text>{exam.name}</Text>
                    </HStack>
                    <Text onClick={() => [passData(exam), onClose()]}>Elegir</Text>
                  </HStack>
                ))}
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

export default ModalTest
