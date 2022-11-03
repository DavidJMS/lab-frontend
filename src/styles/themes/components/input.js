const baseStyle = {
    field: {
      width: '100%',
      minWidth: 0,
      outline: 0,
      position: 'relative',
      appearance: 'none',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      padding: '10px 14px'
    }
  }
  
  const size = {
    lg: {
      fontSize: 'lg',
      px: '4',
      h: '12',
      borderRadius: 'md'
    },
    md: {
      fontSize: 'md',
      px: '4',
      h: '10',
      borderRadius: '8px'
    },
    sm: {
      fontSize: 'sm',
      px: '3',
      h: '8',
      borderRadius: 'sm'
    },
    xs: {
      fontSize: 'xs',
      px: '2',
      h: '6',
      borderRadius: 'sm'
    }
  }
  
  const sizes = {
    lg: {
      field: size.lg,
      addon: size.lg
    },
    md: {
      field: size.md,
      addon: size.md
    },
    sm: {
      field: size.sm,
      addon: size.sm
    },
    xs: {
      field: size.xs,
      addon: size.xs
    }
  }
  
  const variantFilled = {
    field: {
      border: '1px solid',
      borderColor: '#D0D5DD',
      bg: '#fff',
      _hover: {
        bg: '#fff'
      },
      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all'
      },
      _invalid: {
        borderColor: '#FAE5E3 !important',
        boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
        _focus: {
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEE4E2'
        }
      },
      _focus: {
        borderColor: '#D0D5DD',
        boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F4EBFF',
        bg: '#fff'
      },
      _disabled: {
        opacity: 1
      }
    }
  }
  
  const variants = {
    // outline: variantOutline,
    filled: variantFilled,
    // flushed: variantFlushed,
    // unstyled: variantUnstyled,
    transparent: {
      field: {
        background: 'transparent',
        borderTop: '0px',
        borderRight: '0px',
        borderLeft: '0px',
        ':focus': {
          background: 'white'
        }
      }
    }
  }
  
  const Input = {
    baseStyle,
    variants,
    sizes,
    defaultProps: {
      size: 'md',
      variant: 'filled'
    }
  }
  
  export default Input
  