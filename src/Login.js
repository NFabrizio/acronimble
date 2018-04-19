import React from 'react';

const Login = ({ auth }) => (
  <div>
    <p> You need to be logged in to do that</p>
    <button onClick={auth.login}>Login</button>
  </div>
);

export default Login;