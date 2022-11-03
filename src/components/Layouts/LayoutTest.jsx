import {
    Text,
    HStack,
    Input,
    Box,
    Image,
    Checkbox
  } from "@chakra-ui/react";
  import Header from "./Header";
  import SearchIcon from '../../assets/SearchTest.svg'

  
  const LayoutTest = () => {
    const title = 'Modal Cliente'
    return (
       <Box w='100%' display='flex' flexDirection='column' alignItems='center'>
          <HStack w='100%' justifyContent='center' display='flex'>
              <Input className="input--text__borderbottom " borderRadius='0px' border='0' borderBottom='1.5px solid #D0D0D0' outline='none' background='0px' w='54%' placeholder="text" />
              <Image height='2rem' src={SearchIcon} />
          </HStack>
            <HStack mt={4} w='70%'> 
                <HStack border='1px solid #D0D0D0' borderRadius='6px' color='#718096' padding='1rem' w='100%' height='2.5rem'>
                    <Text>prueba</Text>
                </HStack>
                <Checkbox defaultChecked></Checkbox>
            </HStack>
            <HStack mt={4} w='70%'> 
                <HStack border='1px solid #D0D0D0' borderRadius='6px' color='#718096' padding='1rem' w='100%' height='2.5rem'>
                    <Text>prueba</Text>
                </HStack>
                <Checkbox defaultChecked></Checkbox>
            </HStack> <HStack mt={4} w='70%'> 
                <HStack border='1px solid #D0D0D0' borderRadius='6px' color='#718096' padding='1rem' w='100%' height='2.5rem'>
                    <Text>prueba</Text>
                </HStack>
                <Checkbox defaultChecked></Checkbox>
            </HStack> <HStack mt={4} w='70%'> 
                <HStack border='1px solid #D0D0D0' borderRadius='6px' color='#718096' padding='1rem' w='100%' height='2.5rem'>
                    <Text>prueba</Text>
                </HStack>
                <Checkbox defaultChecked></Checkbox>
            </HStack> <HStack mt={4} w='70%'> 
                <HStack border='1px solid #D0D0D0' borderRadius='6px' color='#718096' padding='1rem' w='100%' height='2.5rem'>
                    <Text>prueba</Text>
                </HStack>
                <Checkbox defaultChecked></Checkbox>
            </HStack>
       </Box>
    )
  }
  
  export default LayoutTest