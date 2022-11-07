
import FileProgress from '../FileProgress'
import { Icon } from '@iconify/react'
import { showingTimerToast, showingPopUps } from '@/functions/commonFunctions'
import Swal from 'sweetalert2'
import warningIcon from '@/assets/icons/warning.svg'
import pdfIcon from '@/assets/icons/pdf.svg'
import { useSelector } from 'react-redux'
import useScript from '@/hooks/useScript'
import getBase64 from '@/functions/getBase64'
import iconFile1 from '@/assets/icon-file2.png'
import iconFile2 from '@/assets/icon-file.png'
import iconIneFront from '@/assets/icon-ine.png'
import iconIneBack from '@/assets/icon-ine2.png'
import iconSelfie from '@/assets/icon-selfie.png'

import { CropImageWindow, useCropImage } from '@/components/CropImageV2'

const ButtonNomina = ({ filesInfo, handleCancel }) => {
  return (
    <div className='option option1'>
      {
        filesInfo && filesInfo[0] &&
          <Icon icon='akar-icons:circle-check-fill' />
      }
      <img className='icon' src={iconFile1} alt='Recibo de nomina' />
      <div className='files'>
        <span>Último recibo de nómina</span>
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

        {
          (!filesInfo || !filesInfo[0]) &&
            <p>Sube tu documento</p>
        }
      </div>
    </div>
  )
}
const ButtonEdoCuenta = ({ filesInfo, handleCancel }) => {
  return (
    <div className='option option2'>
      {
        filesInfo && filesInfo[0] &&
          <Icon icon='akar-icons:circle-check-fill' />
      }
      <img className='icon' src={iconFile2} alt='Estado de cuenta' />
      <div className='files'>
        <span>Último  estado de cuenta de nómina</span>
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

        {
          (!filesInfo || !filesInfo[0]) &&
            <p>Sube tu documento .pdf</p>
        }
      </div>
    </div>
  )
}
const ButtonIneFront = ({ filesInfo, handleCancel }) => {
  return (
    <div className='option option1'>
      {
        filesInfo && filesInfo[0] &&
          <Icon icon='akar-icons:circle-check-fill' />
      }
      <img className='icon' src={iconIneFront} alt='ine frontal' />
      <div className='files'>
        <span>Tomar foto frontal</span>
        {/* {
          window.innerWidth > 768
            ? <span>Frontal de tu INE</span>
            : <span>Tomar foto frontal</span>
        } */}
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

        {/* {
          (!filesInfo || !filesInfo[0]) && window.innerWidth > 768 &&
            <p>Tomale una foto legible a tu documento</p>
        } */}
      </div>
    </div>
  )
}
const ButtonIneBack = ({ filesInfo, handleCancel }) => {
  return (
    <div className='option option2'>
      {
        filesInfo && filesInfo[0] &&
          <Icon icon='akar-icons:circle-check-fill' />
      }
      <img className='icon' src={iconIneBack} alt='ine reverso' />
      <div className='files'>
        <span>Tomar foto reverso</span>
        {/* {
            window.innerWidth > 768
              ? <span>Reverso de tu INE</span>
              : <span>Tomar foto reverso</span>
        } */}
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

        {/* {
          (!filesInfo || !filesInfo[0]) && window.innerWidth > 768 &&
            <p>Tomale una foto legible a tu documento</p>
        } */}
      </div>
    </div>
  )
}
const ButtonSelfie = ({ filesInfo, handleCancel }) => {
  return (
    <div className='option option1'>
      {
        filesInfo && filesInfo[0] &&
          <Icon icon='akar-icons:circle-check-fill' />
      }
      <img className='icon' src={iconSelfie} alt='selfie' />
      <div className='files'>
        <span>Selfie</span>
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

        {
          (!filesInfo || !filesInfo[0]) &&
            <p>¡Listo! Tómate una selfie</p>
        }
      </div>
    </div>
  )
}

const BoxInput = ({ setFiles, files: filesInfo, errors, setErrors, extensionsAllowed = [], type, prompt, validations, cropOptions, component: Content }) => {
  useScript('/pdfjsLib/pdf.js')
  const { cropImage, img: imgToCrop, cropConfig } = useCropImage()

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
      await validations(e, filesInfo)

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

      if (files[0].type.includes('image') && cropOptions) {
        try {
          const newImage = await cropImage(files[0], cropOptions)
          files[0] = newImage
        } catch (error) {
          e.target.value = null
          return
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
                file,
                type,
                id: Math.round(new Date().getTime() * (Math.random() + 1))
              }
              if (password) {
                data.password = password
              }
              return data
            }).catch(error => {
              console.error(error)
              const titles = {
                'No password given': 'Documento protegido',
                'Incorrect Password': 'Contraseña incorrecta'
              }
              const message = titles[error.message]
              if (!message) {
                return {
                  file,
                  type,
                  id: Math.round(new Date().getTime() * (Math.random() + 1))
                }
              }

              return {
                error: true,
                message
              }
            })
            if (fileData.error) {
              const title = fileData.message
              password = await new Promise((resolve, reject) => {
                Swal.fire({
                  showCancelButton: true,
                  showCloseButton: false,
                  input: 'password',
                  inputAttributes: {
                    placeholder: 'Contraseña'
                  },
                  customClass: {
                    container: 'InAppMessagge',
                    actions: 'buttons',
                    confirmButton: 'btn-blue',
                    cancelButton: 'btn-outline'
                  },
                  html: `
                  <i class="icon d-block mx-auto" style="width: 4rem; height: 4rem;">
                      <img src="${pdfIcon}" />
                  </i>
                  <h3 class="name text-center">${title}</h3>
                  <div>
                    <p class="text">Tu documento (${file.name}) está protegido por clave, te pedimos que nos suministres esta información. No te preocupes, tus datos en todo momento estarán seguros.</p>
                  </div>
                  `,
                  confirmButtonText: 'Siguiente',
                  cancelButtonText: 'Cancelar',
                  inputAutoTrim: false,
                  preConfirm: (password) => {
                    return { password }
                  }
                }).then((result) => {
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
            file,
            type,
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
    <>
      <button style={{ border: 'none', outline: 0, background: 'transparent', width: '100%' }} onClick={handleSelectOption}>
        <Content filesInfo={filesInfo} handleCancel={handleCancel} />
        {(() => {
          if (type === 'selfie') return <input onChange={handleUploadFiles} type='file' name={type} hidden accept='capture=camera' capture='user' />
          if (type === 'reverso' || type === 'frontal') return <input onChange={handleUploadFiles} type='file' name={type} hidden accept='capture=camera' capture='environment' />
          return <input onChange={handleUploadFiles} type='file' name={type} accept={`.${extensionsAllowed.join(',.')}`} hidden />
        })()}
      </button>
      <CropImageWindow img={imgToCrop} cropConfig={cropConfig} />
    </>
  )
}

export const BoxInputNomina = ({ setFiles, files, errors, setErrors }) => {
  const email = useSelector(state => state.auth.user.authenticatedUser.email)
  const extensionsAllowed = ['pdf', 'doc', 'docx', 'jpg', 'png', 'jpeg']

  const prompt = (callback) => {
    Swal.fire({
      showCancelButton: false,
      showCloseButton: false,
      customClass: {
        container: 'InAppMessagge',
        actions: 'buttons',
        confirmButton: 'btn-blue',
        cancelButton: 'btn-outline'
      },
      html: `
      <i class="icon d-block mx-auto" style="width: 4rem; height: 4rem;">
          <img src="${warningIcon}" />
      </i>
      <h3 class="name text-center">Recuerda</h3>
      <div>
        <p class="text text-center">No deberá de tener más de 30 días de antigüedad.</p>
      </div>
      `,
      confirmButtonText: 'Entiendo'
    }).then((result) => {
      if (result.isConfirmed) {
        callback()
      }
    })
  }

  const validations = (e, filesInfo) => {
    return new Promise((resolve, reject) => {
      const files = e.target.files
      const required = 1

      let error = ''
      if (!files.length || files.length === 0) {
        error = 'sin data'
        return
      }
      const filesUploades = JSON.parse(window.localStorage.getItem('filesUploades') || '{}')[email] || []
      if (filesUploades.some((filename) => files[0].name === filename)) {
        showingPopUps('', 'Carga los documentos que se indican. Hacemos una cuidadosa revisión de ambos, por lo que no puedes cargar el mismo en los dos o documentos ajenos a los que se solicitan. <br/> Intenta de nuevo.', 'error', 'Ok', '', 'swa_btn')
        e.target.value = null
        error = 'documento repetido'
        return
      }

      if (filesInfo.length >= required) {
        showingTimerToast({ title: 'No hacen falta mas recibos de nómina', position: 'center' })
        error = 'maximo alcanzado'
        return
      }
      if (!window.pdfjsLib) {
        showingTimerToast({ title: 'Error cargando documento', text: 'Vuelva a intentarlo', position: 'center' })
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
      type='nom'
      prompt={prompt}
      validations={validations}
      component={ButtonNomina}
    />
  )
}

export const BoxInputEdoCuenta = ({ setFiles, files, errors, setErrors }) => {
  const email = useSelector(state => state.auth.user.authenticatedUser.email)
  const extensionsAllowed = ['pdf']

  const prompt = (callback) => {
    Swal.fire({
      showCancelButton: false,
      showCloseButton: false,
      customClass: {
        container: 'InAppMessagge',
        actions: 'buttons',
        confirmButton: 'btn-blue',
        cancelButton: 'btn-outline'
      },
      html: `
      <i class="icon d-block mx-auto" style="width: 4rem; height: 4rem;">
          <img src="${pdfIcon}" />
      </i>
      <h3 class="name text-center">Recuerda</h3>
      <div>
        <p class="text text-center">En el estado de cuenta que cargues deberá de aparecer el abono del recibo de tu última nómina.</p>
      </div>
      `,
      confirmButtonText: 'Entiendo'
    }).then((result) => {
      if (result.isConfirmed) {
        callback()
      }
    })
  }

  const validations = (e, filesInfo) => {
    return new Promise((resolve, reject) => {
      const files = e.target.files
      const required = 1

      let error = ''
      if (!files.length || files.length === 0) {
        error = 'sin data'
        return
      }
      const filesUploades = JSON.parse(window.localStorage.getItem('filesUploades') || '{}')[email] || []
      if (filesUploades.some((filename) => files[0].name === filename)) {
        showingPopUps('', 'Carga los documentos que se indican. Hacemos una cuidadosa revisión de ambos, por lo que no puedes cargar el mismo en los dos o documentos ajenos a los que se solicitan. <br/> Intenta de nuevo.', 'error', 'Ok', '', 'swa_btn')
        e.target.value = null
        error = 'documento repetido'
        return
      }

      if (filesInfo.length >= required) {
        showingTimerToast({ title: 'No hacen falta mas estados de cuenta', position: 'center' })
        error = 'maximo alcanzado'
        return
      }
      if (!window.pdfjsLib) {
        showingTimerToast({ title: 'Error cargando documento', text: 'Vuelva a intentarlo', position: 'center' })
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
      prompt={prompt}
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
        reject(error)
      }
      for (let i = 0; i < files.length; i++) {
        const currectExtension = files[i].name.split('.').pop()
        const validation = extensionsAllowed.indexOf(currectExtension.toLowerCase())
        if (validation === -1) {
          showingTimerToast({ title: 'Este tipo de documento no es permitido', icon: 'error', position: 'center' })
          error = 'no permitido'
          reject(error)
        }
      }

      if (!files[0].type.includes('image')) {
        showingTimerToast({ title: 'Este tipo de documento no es permitido', icon: 'error', position: 'center' })
        error = 'no permitido'
        reject(error)
      }

      if (filesInfo.length >= required) {
        showingTimerToast({ title: 'No hacen falta mas fotos', position: 'center' })
        error = 'maximo alcanzado'
        reject(error)
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
        reject(error)
      }
      for (let i = 0; i < files.length; i++) {
        const currectExtension = files[i].name.split('.').pop()
        const validation = extensionsAllowed.indexOf(currectExtension.toLowerCase())
        if (validation === -1) {
          showingTimerToast({ title: 'Este tipo de documento no es permitido', icon: 'error', position: 'center' })
          error = 'no permitido'
          reject(error)
        }
      }

      if (!files[0].type.includes('image')) {
        showingTimerToast({ title: 'Este tipo de documento no es permitido', icon: 'error', position: 'center' })
        error = 'no permitido'
        reject(error)
      }

      if (filesInfo.length >= required) {
        showingTimerToast({ title: 'No hacen falta mas fotos', position: 'center' })
        error = 'maximo alcanzado'
        reject(error)
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
        reject(error)
      }
      for (let i = 0; i < files.length; i++) {
        const currectExtension = files[i].name.split('.').pop()
        const validation = extensionsAllowed.indexOf(currectExtension.toLowerCase())
        if (validation === -1) {
          showingTimerToast({ title: 'Este tipo de documento no es permitido', icon: 'error', position: 'center' })
          error = 'no permitido'
          reject(error)
        }
      }

      if (!files[0].type.includes('image')) {
        showingTimerToast({ title: 'Este tipo de documento no es permitido', icon: 'error', position: 'center' })
        error = 'no permitido'
        reject(error)
      }

      if (filesInfo.length >= required) {
        showingTimerToast({ title: 'No hacen falta mas fotos', position: 'center' })
        error = 'maximo alcanzado'
        reject(error)
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
