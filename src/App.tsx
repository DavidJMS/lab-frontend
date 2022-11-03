import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Layouts
import MainLayout from './components/Layouts/MainLayout'

// Pages
import MedicalHistories from './pages/MedicalHistories'
import AddMedicalHistory from './pages/AddMedicalHistory'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MedicalHistories />} />
        <Route path="add" element={<AddMedicalHistory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
