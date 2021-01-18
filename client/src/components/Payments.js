import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import MyCheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

class Payments extends Component {
    renderContent() {
        if (this.props.paymentDialog.visible) {
            return (
                <div onClick={() => this.props.hidePaymentDialog()} style={{ backgroundColor: 'rgba(0,0,0,0.7)', width: '100%', height: '100%', position: 'fixed', zIndex: '1' }}>
                    <Elements stripe={stripePromise}>
                        <MyCheckoutForm />
                    </Elements>
                </div>
            );
        }
        return;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ paymentDialog }) {
    return { paymentDialog };
}

export default connect(mapStateToProps, actions)(Payments);

/*

<StripeCheckout
                name='Emaily'
                description='5,- for 5 email credits'
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className='btn white blue-grey-text buttonHoverWithShadow'>
                    Add Credits
                    <i className="material-icons left blue-grey-text" style={{lineHeight: 'inherit', height: 'auto'}}>add</i>
                </button>
            </StripeCheckout>

*/