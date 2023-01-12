import {
  Box,
  Flex
} from '@chakra-ui/react'
import PaginationButtons from '../ui/PaginationButtons'
import FinancialsFilter from '../components/FinancialsFilter'
import { getFinancials } from '../../services/financials'
import TableFinancials from '../ui/TableFinancials'
import { useState, useEffect } from 'react'
import SpinnerLayout from '../components/Spinner'

const LayoutFinancials = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async (props = undefined) => {
    try {
      const data = props ? await getFinancials(props) : await getFinancials()
      setData(data.data)
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
          <Flex flexDirection={['colum', 'row']} justifyContent='space-around' w={['100%', '71%']}>
            <FinancialsFilter handleSubmit={fetchData} />
          </Flex>
          <Box width={['80%']} display='flex' flexDirection={['row', 'row', 'row', 'row']} justifyContent='center'>
            <TableFinancials data={data} />
          </Box>
          <span>Total registrado: {data && data.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.amount), 0.0)}</span>
        </Box>
      </Box>
    </Box>
  )
}

export default LayoutFinancials
