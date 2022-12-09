import React, { useEffect, useState } from 'react'

import LayoutMedicalHistory from '../../components/Layouts/LayoutMedicalHistory'

// Services
import { getMedicalHistories } from '../../services/medical.js'

const MedicalHistories = () => {
  const [data, setData] = useState(undefined)
  useEffect(() => {
    const getData = async () => {
      const data = await getMedicalHistories()
      console.log(data)
      setData(data)
    }
    getData()
  }, [])
  if (!data) return <></>
  return <LayoutMedicalHistory data={data} />
}

export default MedicalHistories
