import { Box } from '@chakra-ui/react'
import { getPricesDollar } from '../services/financials'
import TableExchange from '../components/ui/TableExchange'
import { useState, useEffect } from 'react'
import SpinnerLayout from '../components/components/Spinner'
import ModalExchange from '../components/modals/ModalExchange'

const LayoutExchange = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await getPricesDollar()
      setData(data)
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
          <Box width={['80%']} display='flex' flexDirection={['row', 'row', 'row', 'row']} justifyContent='end' mt='1rem'>
            <ModalExchange fetchData={fetchData} />
          </Box>
          <Box width={['80%']} display='flex' flexDirection={['row', 'row', 'row', 'row']} justifyContent='center'>
            <TableExchange data={data} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default LayoutExchange
