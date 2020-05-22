import React, {useState} from 'react'
import Input from 'components/Input'

const LoginPage = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const onChangeUsername = (value) => {
    setUserName(value)
  }
  
  const onChangePassword = (value) => {
    setPassword(value)
  }

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <div className="col-12 mb-3">
        <Input label="Username" placeholder="Your username" value={userName} onChange={onChangeUsername} />
      </div>
      <div className="col-12 mb-3">
        <Input label="Password" placeholder="Your password" type="password" value={password} onChange={onChangePassword} />
      </div>
      <div className="text-center">
        <button className="btn btn-primary">Login</button>
      </div>
    </div>
  )
}

export default LoginPage
