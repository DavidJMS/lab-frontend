import { Text } from '@chakra-ui/react'
const CalculateFinancials = ({ totalPaid, totalPay, priceBs }) => {
  const getResult = (result) => {
    if (result === 0) return <Text color='green' mt={4} fontSize='18px'>Historia pagada satisfactoriamente</Text>
    else if (result > 0) return <Text color='red' mt={4} fontSize='18px'> El cliente debe {result.toFixed(2)}$ {(result * priceBs).toFixed(2)}BS</Text>
    else return <Text color='red' mt={4} fontSize='18px'>Hay que realizar un vuelto de {(result * -1).toFixed(2)}$ {(result * -1 * priceBs).toFixed(2)}BS</Text>
  }
  return (
    <>
      {getResult(totalPay - totalPaid)}
    </>
  )
}

export default CalculateFinancials
