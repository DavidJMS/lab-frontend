import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'

// styles
import './styles/menu/szhsin.css'
import './styles/menu/header.css'

// Layouts
import MainLayout from './components/Layouts/MainLayout'

// Pages
import MedicalHistories from './pages/MedicalHistories/MedicalHistories'
import ClientHistories from './pages/ClientHistories'
import LayoutEditUser from './components/Layouts/LayoutEditUser'
import AddClient from './pages/AddClient'
import AddFormMedical from './pages/AddFormMedical'
import LayoutListExams from './components/Layouts/LayoutListExams'
import Financials from './pages/Financials'

import Header from './components/Layouts/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='' element={<MedicalHistories />} />
        <Route path='clientes' element={<ClientHistories />} />
        <Route path='agregar-cliente' element={<AddClient />} />
        <Route path='agregar-historia-medica' element={<AddFormMedical />} />
        <Route path='editar-cliente-:id' element={<LayoutEditUser />} />
        <Route path='examenes' element={<LayoutListExams />} />
        <Route path='*' element={<MedicalHistories />} />
        <Route path='financials' element={<Financials />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
