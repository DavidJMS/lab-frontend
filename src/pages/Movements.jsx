import {
  Box
} from '@chakra-ui/react'
import { getCashFlows } from '@/services/financials'
import TableCashFlow from '@/components/ui/TableCashFlow'
import { useState, useEffect } from 'react'
import SpinnerLayout from '@/components/components/Spinner'

const Movements = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async (props = undefined) => {
    try {
      const data = await getCashFlows()
      setData(data.results)
      setLoading(true)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <SpinnerLayout />
    )
  }

  return (
    <Box width='100%'>
      <Box mb={4} width='100%' justifyContent='center'>
        <Box w={['100%', '100%', '100%']} display='flex' flexDirection='column' alignItems='center'>
          <Box width={['80%']} display='flex' flexDirection={['row', 'row', 'row', 'row']} justifyContent='center'>
            <TableCashFlow data={data} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Movements
