import React, { useState } from "react";

const UserSignupPage = (props) => {
  const { actions } = props;

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false)

  const onClickSignup = async() => {
    const user = {
      username,
      displayName,
      password,
    };
    setPendingApiCall(true)
    try {
      await actions.postSignup(user);
    } catch (error) {
      setPendingApiCall(false)
    }
    setPendingApiCall(false)
  };

  return (
    <div className="container">
      <h1 className="text-center">Sign up</h1>

      <div>
        <div className="col-12 mb-3">
          <label>Display name</label>
          <input
            className="form-control"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            type="text"
            placeholder="Your display name"
          />
        </div>
        <div className="col-12 mb-3">
          <label>User name</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Your username"
          />
        </div>
        <div className="col-12 mb-3">
          <label>Password</label>
          <input
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name=""
            id=""
            placeholder="Your password"
          />
        </div>
        <div className="col-12 mb-3">
          <label>Repeat password</label>
          <input
            className="form-control"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            type="password"
            name=""
            id=""
            placeholder="Repeat your password"
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
