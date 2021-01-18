import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import * as actions from '../actions';

class Header extends Component {
    componentDidUpdate() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {inDuration: 300, outDuration: 225, coverTrigger: false, constrainWidth: false, alignment: 'right'});
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;

            case false:
                return [
                    <li><Link to="/documentation">Dokumentation</Link></li>,
                    <li><Link to="/pricing">Preise</Link></li>,
                    <li><Link to="/projects">Projekte</Link></li>,
                    <li><div style={{ width: '50px', height: '1px' }}></div></li>,
                    <li><Link to="/signup">Registrieren</Link></li>,
                    <li><Link to="/login">Login</Link></li>
                    
                ]; //<li><a href='/auth/google'>Login</a></li>

            default:
                return [
                    <li key='1'>
                        <button onClick={() => this.props.showPaymentDialog()} className='btn white blue-grey-text buttonHoverWithShadow'>
                            Add Credits
                            <i className="material-icons left blue-grey-text" style={{lineHeight: 'inherit', height: 'auto'}}>add</i>
                        </button>
                    </li>,
                    <li key='2'><div style={{width: '35px', height: '1px'}}></div></li>,
                    /*<li key='2' style={{ margin: '0 10px' }}>
                        Credits: { this.props.auth.credits }
                    </li>,
                    <li key='3'><a href='/api/logout'><i className="material-icons right">chevron_right</i>Logout</a></li>,*/
                    <li><a href="/about"><i className="material-icons">help</i></a></li>,
                    <li><a href="/messages"><i className="material-icons">mail</i></a></li>,
                    <ul id="dropdown1" className="dropdown-content">
                        <li><a href='/account' className='blue-grey-text'><i className="material-icons left" style={{marginRight: '19px', marginLeft: '0px'}}>info</i>Account</a></li>
                        <li><a href='#!' className='blue-grey-text'><span style={{fontWeight: 'bolt', marginRight: '25px', marginLeft: '0px'}}>{ this.props.auth.credits }</span>Credits</a></li>
                        <li><a href='#!' className='blue-grey-text'><i className="material-icons left" style={{marginRight: '19px', marginLeft: '0px'}}>build</i>Preferences</a></li>
                        <li className="divider"></li>
                        <li key='4'><a href='/api/logout' className='blue-grey-text'><i className="material-icons left" style={{marginRight: '19px', marginLeft: '0px'}}>logout</i>Logout</a></li>
                    </ul>,
                    <li><a className="dropdown-trigger" href="#!" data-target="dropdown1"><i className="material-icons">account_circle</i></a></li>
                ];
        }
    }

    render() {
        return (
            <nav className='blue-grey'>
                <div className='nav-wrapper container'>
                    <Link
                            to={ this.props.auth ? '/dashboard' : '/' }
                            className='left brand-logo'
                        >
                            <i className="material-icons left">data_usage</i>
                            track-anything
                        </Link>
                    <ul className='right'>
                        { this.renderContent() }
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(Header);