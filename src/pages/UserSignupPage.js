import React, { useState } from "react";
import Input from "components/Input";

const UserSignupPage = (props) => {
  const { actions } = props;

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false)
  const [errorsState, setErrorsState] = useState({})

  const onClickSignup = async() => {
    const user = {
      username,
      displayName,
      password,
    };
    setPendingApiCall(true)
    try {
      await actions.postSignup(user);
    } catch (apiErros) {
      const {data} = apiErros.response
      let errors = {...errorsState}
      if(data && data.validationErrors ) {
        errors = {...data.validationErrors}
      }
      setErrorsState(errors)
      setPendingApiCall(false)
    }
    setPendingApiCall(false)
  };

  return (
    <div className="container">
      <h1 className="text-center">Sign up</h1>

      <div>
        <div className="col-12 mb-3">
          <Input
            label="Display name"
            placeholder="Your display name"
            value={displayName}
            onChange={setDisplayName}
            hasError={errorsState.displayName && true}
            error={errorsState.displayName}
            type="text"
          />
        </div>
        <div className="col-12 mb-3">
          <Input
            label="User name"
            placeholder="Your username"
            value={username}
            onChange={setUsername}
            hasError={errorsState.username && true}
            error={errorsState.username}
            type="text"
          />
        </div>
        <div className="col-12 mb-3">
          <Input
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={setPassword}
            hasError={errorsState.password && true}
            error={errorsState.password}
            type="password"
            name=""
            id=""
          />
        </div>
        <div className="col-12 mb-3">
        <Input
            label="Repeat password"
            placeholder="Repeat your password"
            value={repeatPassword}
            onChange={setRepeatPassword}
            hasError={errorsState.repeatPassword && true}
            error={errorsState.repeatPassword}
            type="password"
            name=""
            id=""
          />
        </div>

        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={onClickSignup}
            type="submit"
            disabled={pendingApiCall}
          >
            {pendingApiCall && <div className="spinner-border text-light spinner-border-sm mr-sm-1" role="status">
              <span className="sr-only">Loading...</span>
            </div>}
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

UserSignupPage.defaultProps = {
  actions: {
    postSignup: () =>
      new Promise((resolve, reject) => {
        resolve({});
      }),
  },
};

export default UserSignupPage;
