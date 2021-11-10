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

export default function Register() {
  const [fields, setFields] = useState<IFields>({} as IFields)

  //toast ids
  const idToastFields = 'idToastFields'
  const idToastValidEmail = 'idToastValidEmail'
  const idSuccesPost = 'idSuccesPost'
  const idToastValidCpf = 'idToastValidCpf'

  const emailAdvice = window.document.getElementById('emailAdvice')
  const telephoneAdvice = window.document.getElementById('telephoneAdvice')
  const cpfAdvice = window.document.getElementById('cpfAdvice')

  async function saveUser() {
    if (!fields.name || !fields.password || !fields.eMail || !fields.cpf) {
      toast.error('Preencha todos os campos obrigatórios', {
        toastId: idToastFields,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
      })
    } else if (!validateEmail(fields.eMail)) {
      toast.error('Insira um e-mail válido', {
        toastId: idToastValidEmail,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
      })

      if (emailAdvice !== null) {
        emailAdvice.style.display = 'block'
      }
    } else if (!validateCpf(fields.cpf)) {
      toast.error('Insira um cpf válido', {
        toastId: idToastValidCpf,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
      })
      if (cpfAdvice !== null) {
        cpfAdvice.style.display = 'block'
      }
    } else if (fields.telephone && !validateTelephone(fields.telephone)) {
      toast.error('Insira um telefone válido', {
        toastId: idToastValidEmail,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
      })
      if (telephoneAdvice !== null) {
        telephoneAdvice.style.display = 'block'
      }
    } else {
      await api.post('/users', fields)
      toast.success('Usuário criado com sucesso', {
        toastId: idSuccesPost,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
      })
      //@ts-ignore
      telephoneAdvice.style.display = 'none'
      //@ts-ignore
      cpfAdvice.style.display = 'none'
      //@ts-ignore
      emailAdvice.style.display = 'none'
      //@ts-ignore
      document.getElementById('nameInput').value = ''

      //@ts-ignore
      document.getElementById('passwordInput').value = ''
      //@ts-ignore
      document.getElementById('emailInput').value = ''
      //@ts-ignore
      document.getElementById('cpfInput').value = ''
      //@ts-ignore
      document.getElementById('telephoneInput').value = ''
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
          id='nameInput'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, name: event.target.value })
          }
        />

        <p>Senha</p>
        <input
          type='password'
          id='passwordInput'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, password: event.target.value })
          }
        />

        <p>E-mail</p>
        <input
          type='text'
          id='emailInput'
          className='email-field'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, eMail: event.target.value })
          }
        />
        <p className='advice' id='emailAdvice'>
          *Utilize o seguinte formato: email@email.com
        </p>

        <p>CPF</p>
        <input
          type='text'
          id='cpfInput'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, cpf: event.target.value })
          }
        />
        <p className='advice' id='cpfAdvice'>
          *Utilize o seguinte formato: 000.000.000-00
        </p>

        <p>Telefone</p>
        <input
          type='text'
          id='telephoneInput'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, telephone: event.target.value })
          }
        />

        <p className='advice advice-telephone' id='telephoneAdvice'>
          *Utilize o seguinte formato: (51)99999-9999
        </p>

        <button onClick={saveUser}>Cadastrar</button>
      </div>
    </div>
  )
}
