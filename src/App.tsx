import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

//styles
import './styles/menu/szhsin.css'

// Layouts
import MainLayout from './components/Layouts/MainLayout'

// Pages
import MedicalHistories from './pages/MedicalHistories'
import ClientHistories from './pages/ClientHistories'
import LayoutEditUser from './components/Layouts/LayoutEditUser'
import AddClient from './pages/AddClient'
import AddFormMedical from './pages/AddFormMedical'

function App () {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<MedicalHistories />} />
        <Route path='client' element={<ClientHistories />} />
        <Route path='add/client' element={<AddClient />} />
        <Route path='add/medical' element={<AddFormMedical />} />
        <Route path='client/edit/:id/' element={<LayoutEditUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
