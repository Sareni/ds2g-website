import React from 'react';
import SignupForm from './SignupForm';
import ThirdPartyLoginForm from './ThirdPartyLoginForm';

const Signup = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>
            Signup!
            </h1>
            <SignupForm />
            <ThirdPartyLoginForm />
        </div>
    );
};

export default Signup;