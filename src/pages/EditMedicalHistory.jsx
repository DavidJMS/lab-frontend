// Dependencies
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Form Components
import FormsMedical from '../components/ui/FormsMedical'

// Services
import { getMedical as getMedicalService, getPaymentsMedical, getResultsMedical } from '../services/medical'
import { getTodayTasa } from '@/services/financials'

const EditMedicalHistory = () => {
  const { medicalId } = useParams()
  const [payments, setPayments] = useState()
  const [medicalHistory, setMedicalHistory] = useState()
  const [price, setPrice] = useState(undefined)
  const [results, setResults] = useState()

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
  const getMedicalResults = async () => {
    const response = await getResultsMedical(medicalId)
    setResults(response)
  }
  useEffect(() => {
    getMedical()
    getMedicalPayments()
    getPrice()
    getMedicalResults()
  }, [])

  if (!medicalHistory || !payments || !price) return <></>

  return (
    <FormsMedical
      medicalHistory={medicalHistory}
      payments={payments}
      price={price}
      getMedicalPayments={getMedicalPayments}
      results={results}
      getMedicalResults={getMedicalResults}
    />
  )
}

export default EditMedicalHistory
