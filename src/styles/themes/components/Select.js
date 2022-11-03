import inputTheme from './input'

const baseStyleField = {
  ...inputTheme.baseStyle?.field,
  padding: '0px 28px 1px 14px',
  appearance: 'none',
  paddingBottom: '1px',
  lineHeight: 'normal',
  color: 'inherit',
  '> option, > optgroup': {
    bg: 'white'
  }
}

const baseStyleIcon = {
  width: '6',
  height: '100%',
  insetEnd: '2',
  position: 'relative',
  color: 'currentColor',
  fontSize: 'xl',
  _disabled: {
    opacity: 0.5
  }
}

const baseStyle = {
  field: baseStyleField,
  icon: baseStyleIcon
}

const iconSpacing = {
  paddingInlineEnd: '8'
}

const sizes = {
  lg: {
    ...inputTheme.sizes?.lg,
    field: {
      ...inputTheme.sizes?.lg.field,
      ...iconSpacing
    }
  },
  md: {
    ...inputTheme.sizes?.md,
    field: {
      ...inputTheme.sizes?.md.field,
      ...iconSpacing
    }
  },
  sm: {
    ...inputTheme.sizes?.sm,
    field: {
      ...inputTheme.sizes?.sm.field,
      ...iconSpacing
    }
  },
  xs: {
    ...inputTheme.sizes?.xs,
    field: {
      ...inputTheme.sizes?.xs.field,
      ...iconSpacing
    },
    icon: {
      insetEnd: '1'
    }
  }
}

export const Select = {
  baseStyle,
  sizes,
  variants: inputTheme.variants,
  defaultProps: inputTheme.defaultProps
}

export default Select
