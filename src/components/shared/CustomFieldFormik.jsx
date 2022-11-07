import { useField, useFormikContext, ErrorMessage } from 'formik'
import {
  Textarea,
  Input,
  Select,
  Box
} from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'

const MessageError = ({ children }) => {
  return <small style={{ marginTop: '5px', color: '#F44336' }}>{children}</small>
}

const withError = Field => {
  const MyComp = (props) => {
    const { errors, touched } = useFormikContext()
    const name = props.name
    return (
      <>
        <Box width='100%' position='relative'>
          <Field {...props} />
          {
            errors[name] && touched[name] &&
              <WarningIcon color='#F44336' position='absolute' right='10px' top='50%' transform='translateY(-50%)' />
          }
        </Box>
        <ErrorMessage name={name} component={MessageError} />
      </>
    )
  }
  MyComp.displayName = 'withError'
  return MyComp
}

const FieldSelect = withError(Select)
const FieldTexarea = withError(Textarea)
const FieldInput = withError(Input)

const Field = (props) => {
  const [field] = useField(props)

  if (props.component === 'select') {
    return (
      <FieldSelect boxShadow='sm' {...props} {...field}>
        {props.children}
      </FieldSelect>
    )
  } else if (props.component === 'textarea') {
    return <FieldTexarea boxShadow='sm' {...props} {...field} />
  }

  return <FieldInput boxShadow='sm' {...props} {...field} />
}

export default Field
