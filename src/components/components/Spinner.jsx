import React from "react"

import { Spinner, Box } from "@chakra-ui/react"

const SpinnerLayout = () => {

    return (
    <Box justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100vh'} display={'flex'} >
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
    />
    </Box>
    )
}

export default SpinnerLayout