import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

class Header extends Component {
    componentDidUpdate() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {inDuration: 300, outDuration: 225, coverTrigger: false, constrainWidth: false, alignment: 'right'});
    }

    renderContent() {
        return [
            <li><Link className='blue-grey-text' to="/showroom">Showroom</Link></li>,
            <li><Link className='blue-grey-text' to="/contact">Kontakt</Link></li>,
            <li><div style={{ width: '50px', height: '1px' }}></div></li>,
            <li><Link className='blue-grey-text' to="/signup">Registrieren</Link></li>,
            <li><Link className='blue-grey-text' to="/login">Login</Link></li>
        ];

    }

    render() {
        return (
            <nav className='white z-depth-0' style={{paddingTop: '40px', marginBottom: '150px'}}>
                <div className='nav-wrapper container'>
                    <Link
                            to="/"
                            className='left' // brand-logo
                        >
                            <div className='blue-grey-text' style={{lineHeight: '18px', paddingBottom: '8px'}}>
                                <span style={{fontSize: '28px', lineHeight: '38px', letterSpacing: '19px'}}>DS2G</span><br />
                                Data Science to go
                            </div>
                        </Link>
                    <ul className='right'>
                        { this.renderContent() }
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;