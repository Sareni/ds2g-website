import React from 'react';
import { Link } from 'react-router-dom';

// https://codepen.io/vaskopetrov/pen/amxvrY

const SignupForm = () => {
    return (
        <div class="container">
            <div class="row">
                <form class="col s12" id="reg-form" action="/auth/signup" method="POST">
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="email" name="email" type="email" class="validate" required />
                        <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="password1" name="password" type="password" class="validate" minlength="6" required />
                        <label for="password1">Passwort</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="password2" type="password" class="validate" minlength="6" required />
                        <label for="password2">Passwort wiederholen</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <Link to="/support" class="btn btn-flat btn-register blue-grey white-text left">Support kontaktieren
                            <i class="material-icons right">email</i>
                        </Link>
                        <button class="btn btn-flat btn-register blue-grey white-text right" type="submit" name="action">Registrieren
                            <i class="material-icons right">done</i>
                        </button>
                        <Link to="/" class="grey btn-flat right white-text" style={{ marginRight: '10px' }}>Abbrechen
                            <i class="material-icons right">cancel</i>
                        </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
