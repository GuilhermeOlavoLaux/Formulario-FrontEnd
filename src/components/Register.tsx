import { ChangeEvent, useState } from 'react'
// const emailRegex = require('../utils/validators')

interface IFields {
  name: string
  password: string
  eMail: string
  cpf: string
  telephone: string
}

export default function Register() {
  const [fields, setFields] = useState<IFields>({} as IFields)

  return (
    <div className='form'>
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

        <button>Cadastrar</button>
      </div>
    </div>
  )
}
