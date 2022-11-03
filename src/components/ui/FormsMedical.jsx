import {
    Text,
    HStack,
    Input,
    Box,
    Select,
    Button,
    Image
  } from "@chakra-ui/react";
  import Folder from '../../assets/Folder.svg'
    
  const FormsMedical = () => {
    return (
     <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
        <Text mt={4} borderRadius='5px' textAlign='center' fontSize='1.1rem' color='#F5F5F5' bgColor='#0DA7D9' w='90%'>Datos Personales</Text>
      <Box mt={4} width='80%'>
       <HStack mb={4}>
          <Text>Nombre y Apellido :</Text>
          <Input w='auto' />
       </HStack>
       <HStack mb={4}>
          <Text>Cedula :</Text>
          <Input w='auto' />
       </HStack>
       <HStack mb={4}>
          <Text>Edad :</Text>
          <Input w='auto' />
       </HStack>
       <HStack mb={4}>
          <Text>Sexo :</Text>
          <Select placeholder='Select option' w='auto'>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
       </HStack>
       <HStack mb={4}>
          <Text>Numero de telefono :</Text>
          <Input w='auto' />
       </HStack>
       <HStack mb={4}>
          <Text>Direccion :</Text>
          <Input w='auto' />
       </HStack>
       <HStack mb={4}>
          <Text>Correo :</Text>
          <Input w='auto' />
       </HStack>
       <HStack mb={4}>
          <Text>Fecha :</Text>
          <Select placeholder='Select option' w='auto'>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
       </HStack>
       <HStack justifyContent='end' w='100%' display='flex'>
          <Button bgColor='#D0D0D0' mr={8}>Agregar</Button>
       </HStack>
      </Box>

        <Text mt={4} borderRadius='5px' textAlign='center' fontSize='1.1rem' color='#F5F5F5' bgColor='#0DA7D9' w='90%'>Solicitud de Examenes</Text>
      <Box mt={8} width='80%'>
      <HStack  mt={4}  w='40%' borderBottom='1px solid #D0D0D0'>
         <Text >Prueba 1</Text>
      </HStack>
      <HStack  mt={4}  w='40%' borderBottom='1px solid #D0D0D0'>
         <Text >Prueba 2</Text>
      </HStack>
      <HStack  mt={4}  w='40%' borderBottom='1px solid #D0D0D0'>
         <Text >Prueba 3</Text>
      </HStack>
      <HStack  mt={4}  w='40%' borderBottom='1px solid #D0D0D0'>
         <Text >Prueba 4</Text>
      </HStack>
      <HStack mt={4} w='40%' borderBottom='1px solid #D0D0D0'>
         <Text >Prueba 5</Text>
      </HStack>
      </Box>

        <Text mt={4} borderRadius='5px' textAlign='center' fontSize='1.1rem' color='#F5F5F5' bgColor='#0DA7D9' w='90%'>Resultado de Examenes</Text>
      <Box mt={8} width='80%'>
        <HStack>
         <label htmlFor="1">
          <Image height='4rem' src={Folder}></Image>
         </label>
         <input className="input--file" type="file" name="prueba2" id="1" />

         <label htmlFor="2">
          <Image height='4rem' src={Folder}></Image>
         </label>
         <input className="input--file" type="file" name="prueba3" id="2" />

         <label htmlFor="3">
          <Image height='4rem' src={Folder}></Image>
         </label>
         <input className="input--file" type="file" name="prueba3" id="3" />
        </HStack>
        <HStack justifyContent='end' w='100%' display='flex'>
            <Button bgColor='#D0D0D0' mr={8}>Agregar</Button>
        </HStack>
      </Box>

        <Text mt={4} borderRadius='5px' textAlign='center' fontSize='1.1rem' color='#F5F5F5' bgColor='#0DA7D9' w='90%'>Datos de Pago</Text>
      <Box mt={8} width='80%'>
        <HStack>
          <Text>Metodo de pago</Text>
          <Select placeholder='Select option' w='auto'>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
        </HStack>
      </Box>
        <HStack mt={4} w='100%' justifyContent='center'>
          <Button>Guardar</Button>
          <Button bgColor='#F03434'>cancelar</Button>
       </HStack>
     </Box>
    )
  }
  
  export default FormsMedical