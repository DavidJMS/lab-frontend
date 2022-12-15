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
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Header = ({ title }) => {
  const [isVisibleHistory, setIsVisibleHistory] = useState(false)
	const [isVisibleClient, setIsVisibleClient] = useState(false)
	const [isVisibleExam, setIsVisibleExam] = useState(false)

  const [IsNotSmallScreen] = useMediaQuery('(min-width: 600px)')

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


  return (
    <Box bgColor='#0DA7D9' display='flex' justifyContent='space-between' alignItems='center' width='100%' height='3rem'>
      <Text ml={4} color='#F5F5F5' fontWeight='500' fontSize={['.8rem','1.5rem']}>{title}</Text>
      { IsNotSmallScreen ? 
      <Example /> :
      <nav>
      <div className="logo">
          <Link to="/">
          </Link>
      </div>

      <input type="checkbox" id="click" />
      <label for="click" className="menu--btn">
          <img src={HamburguerIcon} id="click" className='img' alt="" />
      </label>

      <ul>
          <li><Link to="/catalogue">Finanzas</Link></li>
          <li>
              <Link onClick={() => handleVisibleHistory()} >Historial Medico</Link>
          </li>
              { isVisibleHistory &&
            <Menu position='absolute' zIndex={'1'} >
                <MenuGroup textAlign={'center'} backgroundColor={'#5EC4E4'}>
                  <MenuItem textAlign={'center'} w={'100%'} backgroundColor={'#5EC4E4'}>
                  <Link to='/'>Historial</Link>
                  </MenuItem >
                  <MenuItem textAlign={'center'} w={'100%'} backgroundColor={'#5EC4E4'}>
                  <Link to='add/medical'>Agregar</Link>
                  </MenuItem>
                </MenuGroup>
              </Menu>
              }
          <li>
            <Link onClick={() => handleVisibleClient()}>Cliente</Link>
          </li>
          { isVisibleClient &&
            <Menu position='absolute' zIndex={'1'} >
                <MenuGroup textAlign={'center'} backgroundColor={'#5EC4E4'}>
                  <MenuItem textAlign={'center'} w={'100%'} backgroundColor={'#5EC4E4'}>
                  <Link to='/client'>Listado</Link>
                  </MenuItem >
                  <MenuItem textAlign={'center'} w={'100%'} backgroundColor={'#5EC4E4'}>
                  <Link to='/add/client'>Agregar</Link>
                  </MenuItem>
                </MenuGroup>
              </Menu>
              }
          <li>
            <Link onClick={() => handleVisibleExam()}>Examenes</Link>
          </li>
          { isVisibleExam &&
            <Menu position='absolute' zIndex={'1'} >
                <MenuGroup textAlign={'center'} backgroundColor={'#5EC4E4'}>
                  <MenuItem textAlign={'center'} w={'100%'} backgroundColor={'#5EC4E4'}>
                  <Link to='/list/exams'>Listado</Link>
                  </MenuItem >
                </MenuGroup>
              </Menu>
              }
      </ul>
  </nav>

      }
    </Box>
  )
}

export default Header
