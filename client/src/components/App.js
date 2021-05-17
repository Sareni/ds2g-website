import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import Showroom from './Showroom';
import ContactForm from './ContactForm';

class App extends Component {

    render() {
        return ( // <Payments />
            <BrowserRouter>
                <div>
                    <Header />
                    <div className="container">
                        <Route exact path='/' component={Landing}/>
                        <Route exact path='/showroom' component={Showroom}/>
                        <Route exact path='/contact' component={ContactForm}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;