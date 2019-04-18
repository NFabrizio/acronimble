import React from 'react';

const Login = ({ auth, match }) => {
	const { itemId, definitionId } = match.params;
	const loginHandler = (itemId && definitionId) ? () => auth.loginAndLike(itemId, definitionId) : auth.login;

	return (
		<div>
	    <p> You need to be logged in to do that</p>
	    <button onClick={loginHandler}>Login</button>
	  </div>
	);
};

export default Login;