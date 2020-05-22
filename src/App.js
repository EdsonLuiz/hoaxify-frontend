import React from 'react';
import './App.css';
// import UserSignupPage from 'pages/UserSignupPage';

import * as apiCalls from './apis/apiCalls'
import LoginPage from 'pages/LoginPage';

function App() {

  // const actions = {
  //   postSignup: apiCalls.signup
  // }

  return (
    <>
      {/* <UserSignupPage actions={actions} /> */}
      <LoginPage />
    </>
  );
}

export default App;
