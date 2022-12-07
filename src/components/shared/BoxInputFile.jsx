
import Swal from 'sweetalert2'
import useScript from '../../hooks/useScript'

import { Flex, Box, Progress, Button} from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/toast'
import getBase64 from '../../functions/getBase64'
import DownloadIcon from '../../assets/Download.svg'

const ButtonNomina = ({ filesInfo, handleCancel }) => {
  return (
    <Flex
      w="100%"
      textAlign='center'
      py={6}
      px={4}
      justify='space-between'
      align='center'
      direction='column'
      bg='#6BA793'
      rounded={8}
      color="#fff"
    >
      <span>Último recibo de nómina</span>
      <Box w="100%">
        {
          filesInfo && filesInfo.map((file, i) => (
            <FileProgress
              key={i}
              fileName={file.file.name}
              progress={file.progress}
              cancel={() => handleCancel(file.id)}
            />
          ))
        }
      </Box>
    </Flex>
  )
}
const ButtonEdoCuenta = ({ filesInfo, handleCancel }) => {
  return (
    <Flex
      w="100%"
      textAlign='center'
      py={6}
      px={4}
      justify='space-between'
      align='center'
      direction='column'
      bg='#4C6FC2'
      rounded={8}
      color="#fff"
    >
      <span>Último  estado de cuenta de nómina</span>
      <Box w="100%">
        {
          filesInfo && filesInfo.map((file, i) => (
            <FileProgress
              key={i}
              fileName={file.file.name}
              progress={file.progress}
              cancel={() => handleCancel(file.id)}
            />
          ))
        }
      </Box>
    </Flex>
  )
}
const ButtonIneFront = () => {
  return (
    <Flex
    w='40%'
    >
      <Button backgroundColor='#D0D0D0'>
        Agregar
      </Button>
    </Flex>
  )
}
const ButtonIneBack = ({ filesInfo, handleCancel }) => {
  return (
    <Flex
      w="100%"
      textAlign='center'
      py={6}
      px={4}
      justify='space-between'
      align='center'
      direction='column'
      bg='#6BA793'
      rounded={8}
      color="#fff"
    >
      <span>INE reverso</span>
      <Box w="100%">
        {
          filesInfo && filesInfo.map((file, i) => (
            <FileProgress
              key={i}
              fileName={file.file.name}
              progress={file.progress}
              cancel={() => handleCancel(file.id)}
            />
          ))
        }
      </Box>
    </Flex>
  )
}
const ButtonSelfie = ({ filesInfo, handleCancel }) => {
  return (
    <Flex
      w="100%"
      textAlign='center'
      py={6}
      px={4}
      justify='space-between'
      align='center'
      direction='column'
      bg='#6BA793'
      rounded={8}
      color="#fff"
    >
      <span>Selfie</span>
      <Box w="100%">
        {
          filesInfo && filesInfo.map((file, i) => (
            <FileProgress
              key={i}
              fileName={file.file.name}
              progress={file.progress}
              cancel={() => handleCancel(file.id)}
            />
          ))
        }
      </Box>
    </Flex>
  )
}

const BoxInput = ({ setFiles, files: filesInfo, errors, setErrors, extensionsAllowed = [], type, prompt, validations, component: Content }) => {
  useScript('//mozilla.github.io/pdf.js/build/pdf.js')

  const handleSelectOption = async (e) => {
    if (e.target.type && e.target.type === 'file') return
    const target = e.currentTarget
    const handleClickInput = () => {
      target.querySelector('input').click()
    }

    if (filesInfo.length === 0 && prompt) {
      prompt(handleClickInput)
    } else {
      handleClickInput()
    }
  }

  const handleUploadFiles = async (e) => {
    try {
      const files = [...e.target.files]
      if (validations) {
        await validations(e, filesInfo)
      }

      for (let i = 0; i < files.length; i++) {
        const currectExtension = files[i].name.split('.').pop()
        const validation = extensionsAllowed.indexOf(currectExtension.toLowerCase())
        if (validation === -1) {
          setErrors({ ...errors, [type]: 'extension invalida' })
          return validation
        } else {
          if (errors[type]) {
            const newErrors = { ...errors }
            delete newErrors[type]
            setErrors(newErrors)
          }
        }
      }

      const data = filesInfo.map(file => file)
      let filePosition = 0
      do {
        const file = files[filePosition]
        const base64 = await getBase64(file)
        let password = ''
        let fileData
        const currectExtension = file.name.split('.').pop()
        if (currectExtension.toLowerCase() === 'pdf') {
          do {
            fileData = await window.pdfjsLib.getDocument({ url: base64, password }).promise.then(function () {
              const data = {
                file: file,
                type: type,
                id: Math.round(new Date().getTime() * (Math.random() + 1))
              }
              if (password) {
                data.password = password
              }
              return data
            }).catch(error => {
              return {
                error: true,
                message: error.message
              }
            })
            if (fileData.error) {
              const title = fileData.message === 'Incorrect Password' ? 'Contraseña incorrecta' : 'Documento protegido'
              password = await new Promise((resolve, reject) => {
                Swal.fire({
                  title,
                  text: `Documento (${file.name}) está protegido por clave`,
                  showCancelButton: true,
                  showCloseButton: false,
                  input: 'password',
                  inputAttributes: {
                    placeholder: 'Contraseña'
                  },
                  confirmButtonText: 'Siguiente',
                  cancelButtonText: 'Cancelar',
                  inputAutoTrim: false,
                  preConfirm: (password) => {
                    return { password }
                  },
                  didOpen: () => {
                    document.querySelector('.chakra-portal').style.display = 'none'
                  },
                }).then((result) => {
                  document.querySelector('.chakra-portal').style.display = 'block'

                  if (result.isConfirmed) {
                    resolve(result.value.password)
                  } else {
                    e.target.value = null
                    reject(new Error('canceled'))
                  }
                })
              })
            } else {
              data.push(fileData)
            }
          } while (fileData.error)
        } else {
          data.push({
            file: file,
            type: type,
            id: Math.round(new Date().getTime() * (Math.random() + 1))
          })
        }
        filePosition++
      } while (files[filePosition])
      setFiles(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancel = (id) => {
    const index = filesInfo.findIndex(file => file.id === id)
    const newFilesInfo = filesInfo.map(file => file)
    newFilesInfo.splice(index, 1)
    setFiles(newFilesInfo)
  }

  return (
    <button style={{ border: 'none', outline: 0, background: 'transparent', width: '100%' }} onClick={handleSelectOption}>
      <Content filesInfo={filesInfo} handleCancel={handleCancel} />
      <input onChange={handleUploadFiles} type='file' name={type} hidden />
    </button>
  )
}

const handleError = ({ title, text }) => {
  const toast = createStandaloneToast()

  toast({
    title,
    text,
    status: 'error',
    duration: 3000,
    isClosable: true,
    position: 'top'
  })
}

export const BoxInputNomina = ({ setFiles, files, errors, setErrors }) => {
  const extensionsAllowed = ['pdf', 'doc', 'docx', 'jpg', 'png', 'jpeg']
  const validations = (e, filesInfo) => {
    return new Promise((resolve, reject) => {
      const files = e.target.files
      const required = 1

      let error = ''
      if (!files.length || files.length === 0) {
        error = 'sin data'
        return
      }
      for (let i = 0; i < files.length; i++) {
        const currectExtension = files[i].name.split('.').pop()
        const validation = extensionsAllowed.indexOf(currectExtension.toLowerCase())
        if (validation === -1) {
          handleError({ title: 'Este tipo de documento no es permitido' })
          
          error = 'no permitido'
          reject(error)
          return
        }
      }

      if (filesInfo.length >= required) {
        handleError({ title: 'No hacen falta mas archivos' })
        error = 'maximo alcanzado'
        return
      }
      if (!window.pdfjsLib) {
        handleError({ title: 'Dependencia no encontrada', text: 'Vuelva a intentarlo' })
        error = 'falta pdfjsLib'
        return
      }

      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  }

  return (
    <BoxInput
      setFiles={setFiles}
      files={files}
      errors={errors}
      setErrors={setErrors}
      validations={validations}
      extensionsAllowed={extensionsAllowed}
      type='nom'
      component={ButtonNomina}
    />
  )
}

export const BoxInputEdoCuenta = ({ setFiles, files, errors, setErrors }) => {
  const extensionsAllowed = ['pdf']

  const validations = (e, filesInfo) => {
    return new Promise((resolve, reject) => {
      const files = e.target.files
      const required = 1

      let error = ''
      if (!files.length || files.length === 0) {
        error = 'sin data'
        return
      }
      for (let i = 0; i < files.length; i++) {
        const currectExtension = files[i].name.split('.').pop()
        const validation = extensionsAllowed.indexOf(currectExtension.toLowerCase())
        if (validation === -1) {
          handleError({ title: 'Este tipo de documento no es permitido' })
          
          error = 'no permitido'
          reject(error)
          return
        }
      }

      if (filesInfo.length >= required) {
        handleError({ title: 'No hacen falta mas archivos' })
        error = 'maximo alcanzado'
        return
      }
      if (!window.pdfjsLib) {
        handleError({ title: 'Dependencia no encontrada', text: 'Vuelva a intentarlo' })
        error = 'falta pdfjsLib'
        return
      }

      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  }

  return (
    <BoxInput
      setFiles={setFiles}
      files={files}
      errors={errors}
      setErrors={setErrors}
      extensionsAllowed={extensionsAllowed}
      type='edocuenta'
      validations={validations}
      component={ButtonEdoCuenta}
    />
  )
}

export const BoxInputIneFront = ({ setFiles, files, errors, setErrors }) => {
  const extensionsAllowed = ['jpg', 'png', 'jpeg']

  const validations = (e, filesInfo) => {
    return new Promise((resolve, reject) => {
      const files = e.target.files
      const required = 1

      let error = ''
      if (!files.length || files.length === 0) {
        error = 'sin data'
        return
      }
      for (let i = 0; i < files.length; i++) {
        const currectExtension = files[i].name.split('.').pop()
        const validation = extensionsAllowed.indexOf(currectExtension.toLowerCase())
        if (validation === -1) {
          handleError({ title: 'Este tipo de documento no es permitido' })
          
          error = 'no permitido'
          reject(error)
          return
        }
      }

      if (filesInfo.length >= required) {
        handleError({ title: 'No hacen falta mas archivos' })
        error = 'maximo alcanzado'
        return
      }

      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  }

  const logError = (e) => {
    console.info(e)
  }

  return (
    <BoxInput
      setFiles={setFiles}
      files={files}
      errors={errors || {}}
      setErrors={setErrors || logError}
      extensionsAllowed={extensionsAllowed}
      type='frontal'
      cropOptions={{ aspect: 460 / 290, restrict: false }}
      validations={validations}
      component={ButtonIneFront}
    />
  )
}

export const BoxInputIneBack = ({ setFiles, files, errors, setErrors }) => {
  const extensionsAllowed = ['jpg', 'png', 'jpeg']

  const validations = (e, filesInfo) => {
    return new Promise((resolve, reject) => {
      const files = e.target.files
      const required = 1

      let error = ''
      if (!files.length || files.length === 0) {
        error = 'sin data'
        return
      }
      for (let i = 0; i < files.length; i++) {
        const currectExtension = files[i].name.split('.').pop()
        const validation = extensionsAllowed.indexOf(currectExtension.toLowerCase())
        if (validation === -1) {
          handleError({ title: 'Este tipo de documento no es permitido' })
          
          error = 'no permitido'
          reject(error)
          return
        }
      }

      if (filesInfo.length >= required) {
        handleError({ title: 'No hacen falta mas archivos' })
        error = 'maximo alcanzado'
        return
      }

      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  }

  const logError = (e) => {
    console.info(e)
  }

  return (
    <BoxInput
      setFiles={setFiles}
      files={files}
      errors={errors || {}}
      setErrors={setErrors || logError}
      extensionsAllowed={extensionsAllowed}
      type='reverso'
      cropOptions={{ aspect: 460 / 290, restrict: false }}
      validations={validations}
      component={ButtonIneBack}
    />
  )
}

export const BoxInputSelfie = ({ setFiles, files, errors, setErrors }) => {
  const extensionsAllowed = ['jpg', 'png', 'jpeg']

  const validations = (e, filesInfo) => {
    return new Promise((resolve, reject) => {
      const files = e.target.files
      const required = 1

      let error = ''
      if (!files.length || files.length === 0) {
        error = 'sin data'
        return
      }
      for (let i = 0; i < files.length; i++) {
        const currectExtension = files[i].name.split('.').pop()
        const validation = extensionsAllowed.indexOf(currectExtension.toLowerCase())
        if (validation === -1) {
          handleError({ title: 'Este tipo de documento no es permitido' })
          
          error = 'no permitido'
          reject(error)
          return
        }
      }

      if (filesInfo.length >= required) {
        handleError({ title: 'No hacen falta mas archivos' })
        error = 'maximo alcanzado'
        return
      }

      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  }

  const logError = (e) => {
    console.info(e)
  }

  return (
    <BoxInput
      setFiles={setFiles}
      files={files}
      errors={errors || {}}
      setErrors={setErrors || logError}
      extensionsAllowed={extensionsAllowed}
      type='selfie'
      cropOptions={{ aspect: 1, isCircled: true, restrict: true }}
      validations={validations}
      component={ButtonSelfie}
    />
  )
}

const FileProgress = ({ fileName, progress, cancel }) => {
  return (
    <div w="100%" style={{'textAlign': 'start'}} onClick={cancel}>
      <span display="inline-block" >
        {fileName.slice(0, 7)}.{fileName.split('.').pop()}
      </span>
      <Progress colorScheme='green' height='5px' rounded="5px" value={progress} />
    </div>
  )
}
