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
import Movements from './pages/Movements'
import EditMedicalHistory from './pages/EditMedicalHistory'
import LoginPage from './pages/LoginPage'
import Exchange from './pages/Exchange'
import ShareResults from '@/pages/ShareResult'

// Actions
import UserRoute from '@/router/UserRoute'

// Components
import Header from './components/Layouts/Header'

function App () {
  return (
    <StoryProvider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<UserRoute />}>
            <Route path='' element={<MedicalHistories />} />
            <Route path='clientes' element={<ClientHistories />} />
            <Route path='editar-cliente-:clientId' element={<EditClient />} />
            <Route path='agregar-cliente' element={<AddClient />} />
            <Route path='agregar-historia-medica' element={<AddFormMedical />} />
            <Route path='editar-historia-:medicalId' element={<EditMedicalHistory />} />
            <Route path='examenes' element={<LayoutListExams />} />
            <Route path='resultado/:idResult' element={<ShareResults />} />
            <Route path='pagos' element={<Financials />} />
            <Route path='tasas' element={<Exchange />} />
            <Route path='movimientos' element={<Movements />} />
          </Route>
          <Route path='login' element={<LoginPage />} />
          <Route path='*' element={<MedicalHistories />} />
        </Routes>
      </BrowserRouter>
    </StoryProvider>

  )
}

export default App
