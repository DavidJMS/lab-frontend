import { extendTheme } from '@chakra-ui/react'

// Components
import Button from './components/button'
import Badge from './components/badge'
import Input from './components/input'
import Select from './components/select'
import PinInput from './components/pinInput'
import BlueBox from './components/blueBox'
import Link from './components/link'
import Text from './components/text'
import FormLabel from './components/formLabel'
import FormControl from './components/formControl'
import FormError from './components/formError'
import Textarea from './components/textArea'
import Checkbox from './components/checkbox'

// Default styles
import fontSizes from './defaults/fontSizes'
import colors from './defaults/colors'
import spacing from './defaults/spacing'

const customTheme = extendTheme({
  ...colors,
  ...fontSizes,
  ...spacing,
  components: {
    Button,
    Badge,
    Input,
    Select,
    PinInput,
    BlueBox,
    Link,
    Text,
    Form: FormControl,
    FormLabel,
    FormError,
    Textarea,
    Checkbox
  }
})

export default customTheme
