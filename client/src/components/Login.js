import React from 'react';
import LoginForm from './LoginForm';
import ThirdPartyLoginForm from './ThirdPartyLoginForm';

const Login = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>
            Login!
            </h1>
            <LoginForm />
            <ThirdPartyLoginForm />
        </div>
    );
};

export default Login;