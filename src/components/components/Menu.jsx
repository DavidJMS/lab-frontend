import { Box, HStack } from '@chakra-ui/react'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { Link } from 'react-router-dom'
import { BiExit } from 'react-icons/bi'

export default function Example () {
  return (
    <>
      <Box display='flex'>
        <HStack mr={4} color='#FFFF'>
          <Menu menuButton={<MenuButton>Finanzas</MenuButton>} transition>
            <MenuItem><Link to='/pagos'>Pagos</Link></MenuItem>
            <MenuItem><Link to='/tasas'>Tasas</Link></MenuItem>
          </Menu>
        </HStack>
        <HStack mr={4} color='#FFFF'>
          <Menu menuButton={<MenuButton>Historial Medica</MenuButton>} transition>
            <MenuItem><Link to='/'>Historial</Link></MenuItem>
            <MenuItem><Link to='agregar-historia-medica'>Agregar Historial</Link></MenuItem>
          </Menu>
        </HStack>
        <HStack mr={4} color='#FFFF'>
          <Menu color='#0DA7D9' menuButton={<MenuButton>Clientes</MenuButton>} transition>
            <MenuItem><Link to='/clientes'>Lista de clientes</Link></MenuItem>
            <MenuItem><Link to='/agregar-cliente'>Agregar clientes</Link></MenuItem>
          </Menu>
        </HStack>
        <HStack mr={4} color='#FFFF'>
          <Menu menuButton={<MenuButton>Examenes</MenuButton>} transition>
            <MenuItem><Link to='/examenes'>Lista de examenes</Link></MenuItem>
          </Menu>
        </HStack>
        <HStack mr={4} color='#FFFF'>
          <Link to='/login'><BiExit /></Link>
        </HStack>
      </Box>
    </>
  )
}
