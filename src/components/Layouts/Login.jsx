import { Box, HStack, Input, Text, Button } from "@chakra-ui/react"
import { FormGroup } from "@mui/material"
import { Formik, Form } from "formik"
import { Field } from "../shared/FormFields"

const Login = () => {

    return (
        <>
        <Formik
        initialValues={{
            name: '',
            password: '',
        }}
        validate={(values) => {
          const errors = {}
          if (!values.name) {
            errors.first_names = 'Campo requerido'
          }
          if (!values.password) {
            errors.last_names = 'Campo requerido'
          }
          return errors
        }}
        onSubmit={values => {
          const data = {
            name: values.name,
            password: values.password,
          }
          handleSubmit(data)
        }}
      >
        <Form id="form">
        <Box width={'100%'} height={'100vh'} display={'flex'} backgroundColor={'#FFF'} justifyContent={'center'} alignItems={'center'}>
            <Box display={'flex'} flexDirection={'column'} className="block--form__login" borderRadius={'5px'} width={['80%', '60%']} alignItems={'center'} h={'40vh'} backgroundColor={'#0DA7D9'} >
                <HStack w={'100%'} flexDirection={['column','column', 'column']} height={'100%'} alignItems={'center'} justifyContent={'center'} >
                    <FormGroup>
                    <Text color={'#FFF'}>Nombre</Text>
                    <Field name='name' w={ ['100%', '100%']} />
                    </FormGroup>
                    <FormGroup>
                    <Text color={'#FFF'}>Nombre</Text>
                    <Field name='password' w={['100%', '100%']} />
                    </FormGroup>
                </HStack>
                <Button backgroundColor={'#FFF'} w={'50%'} color={'#0DA7D9'} mb={4}>Iniciar</Button>
            </Box>
        </Box>
        </Form>
        </Formik>
        </>
    )
}

export default Login