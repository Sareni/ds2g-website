import 'materialize-css/dist/css/materialize.min.css';
import './styles/customizeMaterial.css';
import './styles/stripe.css'

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(<App />,
    document.querySelector('#root')
);