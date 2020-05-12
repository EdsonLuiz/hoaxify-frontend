import React, {useState} from 'react'

const UserSignupPage = (props) => {

  const {actions} = props

  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')


  const onClickSignup = () => {
    const user = {
      username,
      displayName,
      password
    }
    actions.postSignup(user)
  }

  return (
    <div>
      <h1>Sign up</h1>

      <div>
        <input 
          value={displayName} 
          onChange={e => setDisplayName(e.target.value)} 
          type="text" placeholder="Your display name"/>
        <input 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          type="text" placeholder="Your username" />
        <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          type="password" name="" id="" placeholder="Your password" />
        <input 
          value={repeatPassword} 
          onChange={(e) => setRepeatPassword(e.target.value)} 
          type="password" name="" id="" placeholder="Repeat your password" />

        <button onClick={onClickSignup} type="submit">Sign Up</button>
      </div>
    </div>
  )
}

UserSignupPage.defaultProps = {
  actions: {
    postSignup: () => new Promise((resolve, reject) => {
      resolve({})
    })
  }
}

export default UserSignupPage
