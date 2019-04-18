import React from 'react';
import { Button } from '@material-ui/core';

const Login = ({ auth, match }) => {
  const { itemId, definitionId } = match.params;
  const loginHandler = (itemId && definitionId) ? () => auth.loginAndLike(itemId, definitionId) : auth.login;
  const buttonMessage = (itemId && definitionId) ? 'Login and Like' : 'Login';

  return (
    <div style={{ paddingLeft: '20px' }}>
      <p> You need to be logged in to do that</p>
      <Button onClick={loginHandler} variant="contained" color="primary">{buttonMessage}</Button>
    </div>
  );
};

export default Login;
