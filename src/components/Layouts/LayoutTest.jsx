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
          <HStack>
              <Input placeholder="Texto" w='auto' />
              <Image height='2rem' src={SearchIcon} />
          </HStack>
            <HStack mt={4} w='70%'> 
                <Input placeholder="text" w='100%' />
                <Checkbox defaultChecked></Checkbox>
            </HStack>
            <HStack mt={4} w='70%'> 
                <Input placeholder="text" w='100%' />
                <Checkbox defaultChecked></Checkbox>
            </HStack> <HStack mt={4} w='70%'> 
                <Input placeholder="text" w='100%' />
                <Checkbox defaultChecked></Checkbox>
            </HStack> <HStack mt={4} w='70%'> 
                <Input placeholder="text" w='100%' />
                <Checkbox defaultChecked></Checkbox>
            </HStack> <HStack mt={4} w='70%'> 
                <Input placeholder="text" w='100%' />
                <Checkbox defaultChecked></Checkbox>
            </HStack>
       </Box>
    )
  }
  
  export default LayoutTest