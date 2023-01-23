import {
  Text,
  Box,
  MenuGroup,
  MenuItem,
  Menu,
  useMediaQuery

} from '@chakra-ui/react'
import Example from '../components/Menu'
import HamburguerIcon from '../../assets/menu.svg'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Header = () => {
  const [isVisibleHistory, setIsVisibleHistory] = useState(false)
  const [isVisibleClient, setIsVisibleClient] = useState(false)
  const [isVisibleExam, setIsVisibleExam] = useState(false)
  const location = useLocation()
  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')
  const [isLogin, setIsLogin] = useState(undefined)

  const handleVisibleHistory = () => {
    if (isVisibleHistory) {
      setIsVisibleHistory(false)
    } else {
      setIsVisibleHistory(true)
    }
  }
  const handleVisibleClient = () => {
    if (isVisibleClient) {
      setIsVisibleClient(false)
    } else {
      setIsVisibleClient(true)
    }
  }
  const handleVisibleExam = () => {
    if (isVisibleExam) {
      setIsVisibleExam(false)
    } else {
      setIsVisibleExam(true)
    }
  }

  useEffect(() => {
    if (location.pathname === '/login') {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [location.pathname])

  console.log(location.pathname, isLogin)

  // console.log(typeof (location.pathname), location.pathname ? location.pathname[0:-1] : "s")

  return (
    <Box bgColor='#0DA7D9' display='flex' justifyContent='space-between' alignItems='center' width='100%' height='3rem'>
      {isLogin
        ? <Text ml={4} color='#F5F5F5' fontWeight='500' fontSize={['.8rem', '1.5rem']}>Login</Text>
        : <>
          <Text ml={4} color='#F5F5F5' fontWeight='500' fontSize={['.8rem', '1.5rem']}>{location && location.pathname.slice(1).toUpperCase() || 'HISTORIAS MEDICAS'}</Text>
          {IsNotSmallScreen
             ? <Example />
             : <nav>
               <div className='logo'>
            <Link to='/' />
          </div>

               <input type='checkbox' id='click' />
               <label htmlFor='click' className='menu--btn'>
            <img src={HamburguerIcon} id='click' className='img' alt='' />
          </label>

               <ul>
            <li><Link to='/finanzas'>Finanzas</Link></li>
            <li>
            <Link onClick={() => handleVisibleHistory()}>Historial Medico</Link>
          </li>
            {isVisibleHistory &&
            <Menu position='absolute' zIndex='1'>
              <MenuGroup textAlign='center' backgroundColor='#5EC4E4'>
                <MenuItem textAlign='center' w='100%' color='#FFFF' backgroundColor='#5EC4E4'>
                  <Link to='/'>Historial</Link>
                </MenuItem>
                <MenuItem textAlign='center' w='100%' color='#FFFF' backgroundColor='#5EC4E4'>
                  <Link to='/agregar-historia-medica'>Agregar</Link>
                </MenuItem>
              </MenuGroup>
            </Menu>}
            <li>
            <Link onClick={() => handleVisibleClient()}>Cliente</Link>
          </li>
            {isVisibleClient &&
            <Menu position='absolute' zIndex='1'>
              <MenuGroup textAlign='center' backgroundColor='#5EC4E4'>
                <MenuItem color='#FFFF' textAlign='center' w='100%' backgroundColor='#5EC4E4'>
                  <Link color='#FFFF' to='/clientes'>Listado</Link>
                </MenuItem>
                <MenuItem textAlign='center' w='100%' color='#FFFF' backgroundColor='#5EC4E4'>
                  <Link to='/agregar-cliente'>Agregar</Link>
                </MenuItem>
              </MenuGroup>
            </Menu>}
            <li>
            <Link onClick={() => handleVisibleExam()}>Examenes</Link>
          </li>
            {isVisibleExam &&
            <Menu position='absolute' zIndex='1'>
              <MenuGroup textAlign='center' backgroundColor='#5EC4E4'>
                <MenuItem textAlign='center' color='#FFFF' w='100%' backgroundColor='#5EC4E4'>
                  <Link to='/examenes'>Listado</Link>
                </MenuItem>
              </MenuGroup>
            </Menu>}
          </ul>
               </nav>}
          </>}
    </Box>
  )
}

export default Header
