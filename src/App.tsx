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
import './styles/forms/formMedicalHistory.css'

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
import EditMedicalHistory from './pages/EditMedicalHistory'
import LoginPage from './pages/LoginPage'

import Header from './components/Layouts/Header'

function App () {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='' element={<MedicalHistories />} />
        <Route path='clientes' element={<ClientHistories />} />
        <Route path='agregar-cliente' element={<AddClient />} />
        <Route path='agregar-historia-medica' element={<AddFormMedical />} />
        <Route path='editar-historia-:medicalId' element={<EditMedicalHistory />} />
        <Route path='editar-cliente-:id' element={<LayoutEditUser />} />
        <Route path='examenes' element={<LayoutListExams />} />
        <Route path='*' element={<MedicalHistories />} />
        <Route path='finanzas' element={<Financials />} />
        <Route path='Login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
