import React, { useState, useEffect } from 'react'
import FormsMedical from '../components/ui/FormsMedical'
import { getTodayTasa } from '@/services/financials'

const AddFormMedical = () => {
  const [price, setPrice] = useState(undefined)
  useEffect(() => {
    const getData = async () => {
      const price = await getTodayTasa()
      setPrice(price)
    }
    getData()
  }, [])
  if (!price) return <></>
  return (
    <FormsMedical
      price={price}
    />
  )
}

export default AddFormMedical
