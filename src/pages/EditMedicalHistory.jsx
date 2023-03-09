import React, { useEffect, useState } from 'react'
import FormsMedical from '../components/ui/FormsMedical'
import { useParams } from 'react-router-dom'
import { getMedical as getMedicalService, getPaymentsMedical } from '../services/medical'
import { getTodayTasa } from '@/services/financials'

const EditMedicalHistory = () => {
  const { medicalId } = useParams()
  const [payments, setPayments] = useState()
  const [medicalHistory, setMedicalHistory] = useState()
  const [price, setPrice] = useState(undefined)

  const getMedical = async () => {
    const response = await getMedicalService(medicalId)
    setMedicalHistory(response)
  }

  const getPrice = async () => {
    const price = await getTodayTasa()
    setPrice(price)
  }

  const getMedicalPayments = async () => {
    const response = await getPaymentsMedical(medicalId)
    setPayments(response)
  }

  useEffect(() => {
    getMedical()
    getMedicalPayments()
    getPrice()
  }, [])

  if (!medicalHistory || !payments || !price) return <></>

  return (
    <FormsMedical
      medicalHistory={medicalHistory}
      payments={payments}
      price={price}
      getMedicalPayments={getMedicalPayments}
    />
  )
}

export default EditMedicalHistory
