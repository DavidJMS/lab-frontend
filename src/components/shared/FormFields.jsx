import { useField, useFormikContext } from 'formik'
import {
  Textarea as TextareaUI,
  Input,
  Select as SelectUI,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Text
} from '@chakra-ui/react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckboxStyled from '../../styles/components/checkbox.styled'
import RadioStyled from '../../styles/components/radio.styled'

const render = (input) => {
  const ouput = typeof input === 'function' ? input() : input
  return ouput
}

// HOC para colocar el mensaje de error y el icono de error
// el icono puede obviarse pasando prop 'noErrorIcon'
const withError = Field => {
  const MyComp = ({ label, helper, leftIcon, noErrorIcon, isDisabled, isRequired, isReadOnly, children, errorIconProps, ...rest }) => {
    const [field] = useField(rest)
    const { errors, touched } = useFormikContext()
    const name = rest.name

    return (
      <FormControl isInvalid={errors[name] && touched[name]} isDisabled={isDisabled} isRequired={isRequired} isReadOnly={isReadOnly}>
        {
          label && <FormLabel mt={1}>{render(label)}</FormLabel>
        }

        <InputGroup>
          {
            leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>
          }
          {
            !children && <Field {...rest} {...field} />
          }
          {
            children &&
              <Field {...rest} {...field}>
                {children}
              </Field>
          }
          {
            !noErrorIcon && errors[name] && touched[name] &&
              <InputRightElement color='danger.100' {...errorIconProps}>
                <ErrorOutlineIcon style={{ width: '18px', height: '18px', color: 'inherit' }} />
              </InputRightElement>
          }
        </InputGroup>

        {
          errors[name] && touched[name] &&
            <FormErrorMessage>{errors[name]}</FormErrorMessage>
        }
        {
          !(errors[name] && touched[name]) && helper &&
            <FormHelperText>{helper}</FormHelperText>
        }
      </FormControl>
    )
  }
  MyComp.displayName = 'withError'
  return MyComp
}

const Checkmark = ({ type = 'checkbox', label, helper, leftIcon, isDisabled, isRequired, isReadOnly, children, errorIconProps, ...rest }) => {
  const [field] = useField(rest)
  const { errors, touched } = useFormikContext()
  const name = rest.name

  return (
    <FormControl isInvalid={errors[name] && touched[name]} isDisabled={isDisabled} isRequired={isRequired} isReadOnly={isReadOnly}>
      {
        label && <FormLabel mt={1}>{render(label)}</FormLabel>
      }

      <InputGroup>
        {
          leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>
        }
        {
          type === 'checkbox' &&
            <CheckboxStyled>
              <Text m={0} color='neutral.80'>{children}</Text>
              <input checked={field.value} {...field} type={type} />
              <span className='checkmark' />
            </CheckboxStyled>
        }
        {
          type === 'radio' &&
            <RadioStyled>
              <Text m={0} color='neutral.80'>{children}</Text>
              <input {...field} value={rest.value} type={type} />
              <span className='checkmark' />
            </RadioStyled>
        }
      </InputGroup>
      {
        errors[name] && touched[name] &&
          <FormErrorMessage>{errors[name]}</FormErrorMessage>
      }
      {
        !(errors[name] && touched[name]) && helper &&
          <FormHelperText>{helper}</FormHelperText>
      }
    </FormControl>
  )
}

const FieldSelect = withError(SelectUI)
const FieldTexarea = withError(TextareaUI)
const FieldInput = withError(Input)

export const Field = (props) => {
  return <FieldInput {...props} />
}

export const Select = (props) => {
  return (
    <FieldSelect {...props} errorIconProps={{ right: '1.5rem' }}>
      {props.children}
    </FieldSelect>
  )
}

export const Textarea = (props) => {
  return <FieldTexarea {...props} noErrorIcon />
}

export const Checkbox = (props) => {
  return <Checkmark type='checkbox' {...props} />
}

export const Radio = (props) => {
  return <Checkmark type='radio' {...props} />
}
