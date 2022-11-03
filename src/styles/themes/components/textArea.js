import inputTheme from './input'

const baseStyle = {
  ...inputTheme.baseStyle?.field,
  paddingY: '2',
  minHeight: '20',
  lineHeight: 'short',
  verticalAlign: 'top'
}

const variants = {
  filled: inputTheme.variants?.filled.field ?? {}
}

const sizes = {
  xs: inputTheme.sizes?.xs.field ?? {},
  sm: inputTheme.sizes?.sm.field ?? {},
  md: inputTheme.sizes?.md.field ?? {},
  lg: inputTheme.sizes?.lg.field ?? {}
}

export const Textarea = {
  baseStyle,
  sizes,
  variants,
  defaultProps: inputTheme.defaultProps
}

export default Textarea
