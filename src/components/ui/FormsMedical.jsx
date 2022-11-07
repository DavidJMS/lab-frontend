import React from 'react'
import {
  Text,
  HStack,
  Input,
  Box,
  Select,
  Button,
  FormControl,
  Spacer,
  useDisclosure
} from '@chakra-ui/react'
import ModalClient from '../modals/ModalClient'
import ModalTest from '../modals/ModalTest'

const FormsMedical = () => {
  // Const para los modales
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('xl')

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  const sizes = ['xl']

  return (
    <>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
        <Text mt={4} borderRadius='5px' textAlign='center' fontSize='1.1rem' color='#F5F5F5' bgColor='#0DA7D9' w='90%'>Datos Personales</Text>
        <Box mt={4} width='80%'>
          <HStack mb={4}>
            <FormControl>
              <Text>Nombre y Apellido :</Text>
              <Input w='auto' />
            </FormControl>
            <FormControl>
              <Text>Cedula :</Text>
              <Input w='auto' />
            </FormControl>
            <FormControl>
              <Text>Edad :</Text>
              <Input w='auto' />
            </FormControl>
          </HStack>
          <HStack mb={4} w='66%'>
            <FormControl>
              <Text>Sexo :</Text>
              <Select placeholder='Selecciona una opcion' w='14rem'>
                <option value='option1'>Masculino</option>
                <option value='option2'>Femenino</option>
              </Select>
            </FormControl>
            <Spacer />
            <FormControl>
              <Text>Numero de telefono :</Text>
              <Input w='auto' />
            </FormControl>
            <Spacer />
          </HStack>
          <HStack mb={4}>
            <FormControl>
              <Text>Direccion :</Text>
              <Input w='auto' />
            </FormControl>
            <FormControl>
              <Text>Correo :</Text>
              <Input w='auto' />
            </FormControl>
            <FormControl>
              <Text>Fecha :</Text>
              <Input
                placeholder='Select Date and Time'
                size='md'
                type='datetime-local'
              />
            </FormControl>
          </HStack>
          <HStack justifyContent='end' w='100%' display='flex'>
            <ModalClient onClose={onClose} size={size} isOpen={isOpen} />

          </HStack>
        </Box>

        <Text mt={4} borderRadius='5px' textAlign='center' fontSize='1.1rem' color='#F5F5F5' bgColor='#0DA7D9' w='90%'>Solicitud de Examenes</Text>
        <Box mt={8} width='80%'>
          <HStack mt={4} w='40%' borderBottom='1px solid #D0D0D0'>
            <Text>Hematologia Completa</Text>
          </HStack>
          <HStack mt={4} w='40%' borderBottom='1px solid #D0D0D0'>
            <Text>Prueba de Covid</Text>
          </HStack>
          <HStack mt={4} w='40%' borderBottom='1px solid #D0D0D0'>
            <Text>Prueba de insulina</Text>
          </HStack>
          <HStack justifyContent='end' w='100%' display='flex'>
            <ModalTest />
          </HStack>
        </Box>
        <Text mt={4} borderRadius='5px' textAlign='center' fontSize='1.1rem' color='#F5F5F5' bgColor='#0DA7D9' w='90%'>Resultado de Examenes</Text>
        <Box mt={8} width='80%'>
          <HStack justifyContent='end' w='100%' display='flex'>
            <Button bgColor='#D0D0D0' mr={8}><label htmlFor='formDocument'>Agregar</label></Button>
            <input name='formDocument' id='formDocument' type='file' hidden />
          </HStack>
        </Box>
        <Text mt={4} borderRadius='5px' textAlign='center' fontSize='1.1rem' color='#F5F5F5' bgColor='#0DA7D9' w='90%'>Datos de Pago</Text>
        <Box mt={8} width='80%'>
          <HStack>
            <Text>Metodo de pago</Text>
            <Select placeholder='Seleccionar' w='auto'>
              <option value='option1'>Pago Movil</option>
              <option value='option2'>Divisa</option>
            </Select>
          </HStack>
          <HStack>
            <FormControl>
              <Text>Monto</Text>
              <Input type='text' />
            </FormControl>
            <FormControl>
              <Text>Numero de Referencia</Text>
              <Input w='auto' type='text' />
            </FormControl>
          </HStack>
        </Box>
        <HStack mt={4} w='100%' justifyContent='center'>
          <Button>Guardar</Button>
          <Button bgColor='#F03434'>Cancelar</Button>
        </HStack>
      </Box>
    </>
  )
}

export default FormsMedical
