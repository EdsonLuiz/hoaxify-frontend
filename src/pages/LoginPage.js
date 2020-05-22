import React, {useState} from 'react'
import Input from 'components/Input'

const LoginPage = (props) => {
  const {actions} = props
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [apiError, setApiError] = useState('')

  let disableSubmit = false
  if(userName.trim() === '' || password.trim() === '') {
    disableSubmit = true
  }

  const onChangeUsername = (value) => {
    setUserName(value)
    setApiError('')
  }
  
  const onChangePassword = (value) => {
    setPassword(value)
    setApiError('')
  }

  const onClickLogin = () => {
    const body = {
      username: userName,
      password
    }

    actions.postLogin(body)
      .catch(error => {
        if(error.response) {
          setApiError(error.response.data.message)
        }
      })

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

      {
        apiError &&
        <div className="col-12 mb-3">
          <div className="alert alert-danger">
            {apiError}
          </div>
        </div>
      }

      <div className="text-center">
        <button disabled={disableSubmit} onClick={onClickLogin} className="btn btn-primary">Login</button>
      </div>
    </div>
  )
}

LoginPage.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({}))
  }
}

export default LoginPage
