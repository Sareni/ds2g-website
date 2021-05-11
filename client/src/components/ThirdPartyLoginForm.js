import React from 'react';

const ThirdPartyLoginForm = () => {
    return (
        <div class="container">
            <div class="row" style={{ marginTop: '100px' }}>
                <div class="input-field col s12 m12 l12">
                    <a class="btn btn-fla btn-register red white-text center" href='/auth/google'>Google</a>
                </div>
                <div class="input-field col s12 m12 l12">
                    <a class="btn btn-fla btn-register green white-text center" href='/auth/auth0'>Auth0</a>
                </div>
            </div>
        </div>
    );
};

export default ThirdPartyLoginForm;

/*
    <div class="input-field col s12 m12 l12">
                    <a class="btn btn-fla btn-register red white-text center" href='/auth/google'>Login mit Google</a>
                </div>
                <div class="input-field col s12 m12 l12">
                    <a class="btn btn-fla btn-register red white-text center" href='/auth/google'>Login mit Google</a>
                </div>

                */