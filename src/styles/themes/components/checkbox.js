import { cssVar } from '@chakra-ui/styled-system'

const $size = cssVar('checkbox-size')

const baseStyleControl = {
  w: $size.reference,
  h: $size.reference,
  transitionProperty: 'box-shadow',
  transitionDuration: 'normal',
  border: '2px solid',
  borderRadius: 'sm',
  borderColor: 'inherit',
  color: 'white',

  _checked: {
    // bg: mode(`${c}.500`, `${c}.200`)(props),
    // borderColor: mode(`${c}.500`, `${c}.200`)(props),
    // color: mode('white', 'gray.900')(props),

    _hover: {
      // bg: mode(`${c}.600`, `${c}.300`)(props),
      // borderColor: mode(`${c}.600`, `${c}.300`)(props)
    },

    _disabled: {
      borderColor: 'gray.200',
      bg: 'gray.200',
      color: 'gray.500'
    }
  },

  _indeterminate: {
    // bg: mode(`${c}.500`, `${c}.200`)(props),
    // borderColor: mode(`${c}.500`, `${c}.200`)(props),
    color: 'white'
  },

  _disabled: {
    bg: 'gray.100',
    borderColor: 'gray.100'
  },

  _focusVisible: {
    boxShadow: 'outline'
  },

  _invalid: {
    borderColor: 'red.500'
  }
}

const baseStyleContainer = {
  touchAction: 'none',
  _disabled: { cursor: 'not-allowed' }
}

const baseStyleLabel = {
  userSelect: 'none',
  touchAction: 'none',
  _disabled: { opacity: 0.4 }
}

const baseStyleIcon = {
  transitionProperty: 'transform',
  transitionDuration: 'normal'
}

const baseStyle = {
  icon: baseStyleIcon,
  container: baseStyleContainer,
  control: baseStyleControl,
  label: baseStyleLabel
}

const sizes = {
  sm: {
    control: { [$size.variable]: 'sizes.3' },
    label: { fontSize: 'sm' },
    icon: { fontSize: '3xs' }
  },
  md: {
    control: { [$size.variable]: 'sizes.4' },
    label: { fontSize: 'md' },
    icon: { fontSize: '2xs' }
  },
  lg: {
    control: { [$size.variable]: 'sizes.5' },
    label: { fontSize: 'lg' },
    icon: { fontSize: '2xs' }
  }
}

const checkbox = {
  baseStyle,
  sizes,
  defaultProps: {
    size: 'md',
    colorScheme: 'blue'
  }
}

export default checkbox
