import React, { useEffect, useState } from 'react'
import FormsMedical from '../components/ui/FormsMedical'
import { useParams } from 'react-router-dom'
import { getMedical as getMedicalService, getPaymentsMedical } from '../services/medical'

const EditMedicalHistory = () => {
  const { medicalId } = useParams()
  const [payments, setPayments] = useState()
  const [medicalHistory, setMedicalHistory] = useState()

  const getMedical = async () => {
    const response = await getMedicalService(medicalId)
    setMedicalHistory(response)
  }

  const getMedicalPayments = async () => {
    const response = await getPaymentsMedical(medicalId)
    setPayments(response)
  }

  useEffect(() => {
    getMedical()
    getMedicalPayments()
  }, [])

  if (!medicalHistory || !payments) return <></>

  return (
    <FormsMedical
      medicalHistory={medicalHistory}
      payments={payments}
      getMedicalPayments={getMedicalPayments}
    />
  )
}

export default EditMedicalHistory
