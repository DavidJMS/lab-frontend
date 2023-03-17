import React, { useState } from 'react'
import {
  useDisclosure
} from '@chakra-ui/react'

import SecuredModal from './components/SecuredModal'
import ShowResults from './components/ShowResults'

const ShareResult = () => {
  const [results, setResults] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <SecuredModal
        setResults={setResults}
        onOpen={onOpen}
      />
      <ShowResults
        results={results}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export default ShareResult
