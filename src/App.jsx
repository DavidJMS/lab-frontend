import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Provider as StoryProvider } from 'react-redux'

// Store
import { store } from './store'

// styles
import './styles/menu/szhsin.css'
import './styles/menu/header.css'
import './styles/forms/formMedicalHistory.css'

// Pages
import MedicalHistories from './pages/MedicalHistories/MedicalHistories'
import ClientHistories from './pages/ClientHistories'
import EditClient from './pages/EditClient'
import AddClient from './pages/AddClient'
import AddFormMedical from './pages/AddFormMedical'
import LayoutListExams from './components/Layouts/LayoutListExams'
import Financials from './pages/Financials'
import EditMedicalHistory from './pages/EditMedicalHistory'
import LoginPage from './pages/LoginPage'

// Components
import Header from './components/Layouts/Header'

function App () {
  return (
    <StoryProvider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='' element={<MedicalHistories />} />
          <Route path='clientes' element={<ClientHistories />} />
          <Route path='editar-cliente-:clientId' element={<EditClient />} />
          <Route path='agregar-cliente' element={<AddClient />} />
          <Route path='agregar-historia-medica' element={<AddFormMedical />} />
          <Route path='editar-historia-:medicalId' element={<EditMedicalHistory />} />
          <Route path='examenes' element={<LayoutListExams />} />
          <Route path='*' element={<MedicalHistories />} />
          <Route path='finanzas' element={<Financials />} />
          <Route path='login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </StoryProvider>

  )
}

export default App
