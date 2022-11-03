const baseStyleRequiredIndicator = {
    marginStart: '1',
    color: 'danger.100'
  }
  
  const baseStyleHelperText = {
    mt: '2',
    color: 'neutral.60',
    lineHeight: 'normal',
    fontSize: 14
  }
  
  const baseStyle = {
    container: {
      width: '100%',
      position: 'relative'
    },
    requiredIndicator: baseStyleRequiredIndicator,
    helperText: baseStyleHelperText
  }
  
  const FormControl = {
    baseStyle
  }
  
  export default FormControl
  