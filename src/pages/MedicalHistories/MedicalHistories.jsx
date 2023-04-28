import React, { useEffect, useState } from 'react'

import { Spinner } from '@chakra-ui/react'

import LayoutMedicalHistory from '../../components/Layouts/LayoutMedicalHistory'

// Services
import { getMedicalHistories } from '../../services/medical.js'

const MedicalHistories = () => {
  const [data, setData] = useState(undefined)
  const [linkPagination, setlinkPagination] = useState(undefined)
  const [nextPagination, setNextPagination] = useState(null)
  const [previousPagination, setpreviousPagination] = useState(null)

  const getData = async () => {
    const data = await getMedicalHistories({ linkPagination })
    setData(data?.results)
    setNextPagination(data?.next)
    setpreviousPagination(data?.previous)
  }
  useEffect(() => {
    getData()
  }, [linkPagination])

  const filterMedicalHistories = async (data) => {
    const dataFiltered = await getMedicalHistories({ linkPagination: undefined, ...data })
    setData(dataFiltered?.results)
    setNextPagination(dataFiltered?.next)
    setpreviousPagination(dataFiltered?.previous)
  }

  const setNumberPaginationLogic = (number) => {
    if (!previousPagination && number === -1) return
    if (!nextPagination && number === 1) return
    if (number === -1) setlinkPagination(previousPagination)
    else setlinkPagination(nextPagination)
  }

  if (!data) return <Spinner />

  return (
    <LayoutMedicalHistory
      data={data}
      filterMedicalHistories={filterMedicalHistories}
      setNumberPagination={setNumberPaginationLogic}
      getData={getData}
    />
  )
}

export default MedicalHistories
