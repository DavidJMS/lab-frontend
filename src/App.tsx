import { useState } from 'react'
import { Button } from '@chakra-ui/react'
import LayoutMedicalHistory from './components/Layouts/LayoutMedicalHistory.jsx'
import LayoutFormMedical from './components/Layouts/LayoutFormMedical.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <LayoutMedicalHistory />,
      <LayoutFormMedical />
    </div>
  )
}

export default App
