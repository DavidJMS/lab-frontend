import React from 'react'
import {
  Modal, ModalOverlay, ModalContent, Text, useDisclosure,
  ModalHeader, ModalCloseButton, ModalBody,
  Table, Thead, Tr, Th, Tbody, Td
} from '@chakra-ui/react'
import { AiOutlineUnorderedList } from 'react-icons/ai'

const ModalExamsOfMedical = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState(['xs', 'lg'])

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  return (
    <>
      <Text onClick={() => handleSizeClick(size)}><AiOutlineUnorderedList /></Text>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='1rem' color='#F5F5F5' textAlign='center' w='100%'>Examenes De La Historia Clínica</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody>
            <Table fontSize={['.8rem', '1rem']} variant='simple' width='90%' m={4}>
              <Thead bg='#F4F7FF'>
                <Tr>
                  <Th>Nombre</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data && data.map((exam, index) => (
                  <Tr key={index}>
                    <Td><Text color='#8E9196'>{exam.name}</Text></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalExamsOfMedical
