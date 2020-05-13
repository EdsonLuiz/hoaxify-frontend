import React from 'react';
import './App.css';
import UserSignupPage from 'pages/UserSignupPage';

import * as apiCalls from './apis/apiCalls'

function App() {

  const actions = {
    postSignup: apiCalls.signup
  }

  return (
    <>
      <UserSignupPage actions={actions} />
    </>
  );
}

export default App;
