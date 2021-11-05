import { ChangeEvent, useState } from 'react'
import api from '../routes/routes'
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

  async function saveUser() {
    const customId = 'custom-id-yes'

    if (!fields.name || !fields.password || !fields.eMail || !fields.cpf) {

      toast.error('Preencha todos os campos obrigatórios', {
        toastId: customId,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
      })
    } else {
      
      await api.post('/users', fields)
      toast.success('Usuário criado com sucesso', {
        toastId: customId,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
      })
      console.log('sai')
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
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, name: event.target.value })
          }
        />

        <p>Senha</p>
        <input
          type='password'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, password: event.target.value })
          }
        />

        <p>E-mail</p>
        <input
          type='text'
          className='email-field'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, eMail: event.target.value })
          }
        />
        <p>CPF</p>
        <input
          type='text'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, cpf: event.target.value })
          }
        />
        <p>Telefone</p>
        <input
          type='text'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFields({ ...fields, telephone: event.target.value })
          }
        />

        <button onClick={saveUser}>Cadastrar</button>
      </div>
    </div>
  )
}
