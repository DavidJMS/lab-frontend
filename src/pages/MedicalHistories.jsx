import React, {useEffect} from 'react'
import LayoutMedicalHistory from '../components/Layouts/LayoutMedicalHistory'

// Services 
import { getMedicalHistories } from '../services/medical.js'

const MedicalHistories = () => {
  useEffect(() => {
    const getData = async () => {
      const data = await getMedicalHistories()
      console.log(data)
    }
    getData()
  }, [])
  return <LayoutMedicalHistory />
}

export default MedicalHistories