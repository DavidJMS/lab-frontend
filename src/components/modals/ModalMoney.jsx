import React, { useEffect, useState } from 'react'
import {
  Modal, ModalOverlay, ModalContent, Text, useDisclosure,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  Table, Thead, Tr, Th, Tbody, Td, Button, useToast
} from '@chakra-ui/react'
import { getCashFlow, desactivateCashFlows } from '@/services/financials'

const ModalMoney = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('xl')
  const [cashFlow, setCashflow] = useState(undefined)
  const toast = useToast()

  const getPaymentsData = async () => {
    const data = await getCashFlow()
    if (data) setCashflow(data)
  }

  useEffect(() => {
    getPaymentsData()
  }, [])

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  const desactivateFlowAction = async (data) => {
    const res = await desactivateCashFlows(data)
    if (!res.error) {
      getPaymentsData()
      toast({
        title: 'Exito',
        description: 'Caja chica cerrada exitosamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    } else {
      toast({
        title: 'Error',
        description: 'Hubo en error, intentelo luego.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  return (
    <>
      <Text onClick={() => handleSizeClick(size)}>Caja Chica</Text>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor='#0DA7D9' height='1rem' color='#F5F5F5' textAlign='center' w='100%'>Caja Chica</ModalHeader>
          <ModalCloseButton color='#F5F5F5' />
          <ModalBody>
            {cashFlow
              ? <Table fontSize={['.8rem', '1rem']} variant='simple' width='90%' m={4}>
                <Thead bg='#F4F7FF'>
                  <Tr>
                    <Th>Total en bs/efectivo</Th>
                    <Th>Total en bs/banco</Th>
                    <Th>Total en $/efectivo</Th>
                    <Th>Total en $/banco</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr key='1'>
                    <Td><Text color='#8E9196'>{cashFlow.amount_bolivares_cash}</Text></Td>
                    <Td color='#8E9196'>{cashFlow.amount_bolivares_bank}</Td>
                    <Td color='#8E9196'>{cashFlow.amount_dollars_cash}</Td>
                    <Td color='#8E9196'>{cashFlow.amount_dollars_bank}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              : <Text>No existe registros en la caja activos</Text>}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { desactivateFlowAction({ id: cashFlow?.id }) }}>
              Realizar Cierre de caja
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalMoney
