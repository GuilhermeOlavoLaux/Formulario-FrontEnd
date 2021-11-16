import { ChangeEvent, useState } from 'react'
import api from '../routes/routes'
import validateEmail from '../utils/eMailValidator'
import validateTelephone from '../utils/telephoneNumberValidator'
import validateCpf from '../utils/cpfValidator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface IFields {
  name: string
  password: string
  eMail: string
  cpf: string
  telephone: string
}

interface IToastConfig {
  toastId: string
  position: any
  autoClose: number
  hideProgressBar: boolean
  closeOnClick: boolean
  pauseOnHover: boolean
  draggable: boolean
  progress: any
}

export default function Register() {
  const [fields, setFields] = useState<IFields>({} as IFields)

  const [emailFlag, setEmailFlag] = useState(false)
  const [telephoneFlag, setTelephoneFlag] = useState(false)
  const [cpfFlag, setCpfFlag] = useState(false)

  function getToastConfig(id: string): IToastConfig {
    return {
      toastId: id,
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined
    }
  }

  function validateAll() {
    if (!fields.name || !fields.password || !fields.eMail || !fields.cpf) {
      toast.error('Preencha todos os campos obrigatórios', getToastConfig('idToastFields'))
      return false
    } else if (!validateEmail(fields.eMail)) {
      toast.error('Insira um e-mail válido', getToastConfig('idToastValidEmail'))
      setEmailFlag(true)
      return false
    } else if (!validateCpf(fields.cpf)) {
      toast.error('Insira um cpf válido', getToastConfig('idToastValidCpf'))
      setCpfFlag(true)
      return false
    } else if (fields.telephone && !validateTelephone(fields.telephone)) {
      toast.error('Insira um telefone válido', {})
      setTelephoneFlag(true)
      return false
    } else {
      return true
    }
  }

  async function saveUser() {
    if (validateAll()) {
      console.log('postei')
      await api.post('/users', fields)
      toast.success('Usuário criado com sucesso', getToastConfig('idSuccesPost'))
      setEmailFlag(false)
      setTelephoneFlag(false)
      setCpfFlag(false)
      setFields({ name: '', password: '', eMail: '', cpf: '', telephone: '' })
    }
  }

  return (
    <div className='form'>
      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />

      <div className='form-container'>
        <h1>Cadastro</h1>
        <p>Nome</p>
        <input
          type='text'
          value={fields.name}
          id='nameInput'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, name: event.target.value })
          }
        />

        <p>Senha</p>
        <input
          type='password'
          value={fields.password}
          id='passwordInput'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, password: event.target.value })
          }
        />

        <p>E-mail</p>
        <input
          type='text'
          value={fields.eMail}
          id='emailInput'
          className='email-field'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, eMail: event.target.value })
          }
        />
        <p
          className='advice'
          id='emailAdvice'
          style={emailFlag ? { display: 'block' } : { display: 'none' }}
        >
          *Utilize o seguinte formato: email@email.com
        </p>

        <p>CPF</p>
        <input
          type='text'
          value={fields.cpf}
          id='cpfInput'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, cpf: event.target.value })
          }
        />
        <p
          className='advice'
          id='cpfAdvice'
          style={cpfFlag ? { display: 'block' } : { display: 'none' }}
        >
          *Utilize o seguinte formato: 000.000.000-00
        </p>

        <p>Telefone</p>
        <input
          type='text'
          value={fields.telephone}
          id='telephoneInput'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, telephone: event.target.value })
          }
        />
        <p
          className='advice advice-telephone'
          id='telephoneAdvice'
          style={telephoneFlag ? { display: 'block' } : { display: 'none' }}
        >
          *Utilize o seguinte formato: (51)99999-9999
        </p>

        <button onClick={saveUser}>Cadastrar</button>
      </div>
    </div>
  )
}
