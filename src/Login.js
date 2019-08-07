import React from 'react';
import { Button } from '@material-ui/core';
import queryString from 'query-string';

const Login = ({ auth, location }) => {
  const { itemId, definitionId } = queryString.parse(location.search);
  const buttonMessage = (itemId && definitionId) ? 'Login and Like' : 'Login';

  return (
    <div style={{ paddingLeft: '20px' }}>
      <p> You need to be logged in to do that</p>
      <Button onClick={() => auth.login(itemId, definitionId)} variant="contained" color="primary">{buttonMessage}</Button>
    </div>
  );
};

export default Login;
