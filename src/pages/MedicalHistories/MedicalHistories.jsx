import React, { useEffect, useState } from 'react'

import LayoutMedicalHistory from '../../components/Layouts/LayoutMedicalHistory'

// Services
import { getMedicalHistories } from '../../services/medical.js'

const MedicalHistories = () => {
  const [data, setData] = useState(undefined)
  useEffect(() => {
    const getData = async () => {
      const data = await getMedicalHistories()
      setData(data)
    }
    getData()
  }, [])
  const filterMedicalHistories = async (data) => {
    const dataFiltered = await getMedicalHistories(data)
    setData(dataFiltered)
  }
  if (!data) return <></>
  return (
    <LayoutMedicalHistory
      data={data}
      filterMedicalHistories={filterMedicalHistories}
    />
  )
}

export default MedicalHistories
