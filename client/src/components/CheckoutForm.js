import React from "react";
import { ElementsConsumer, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { connect } from 'react-redux';
import * as actions from '../actions';

import CardSection from "./CardSection";

class CheckoutForm extends React.Component {

  handleSubmit = async event => {
    event.preventDefault();

    const {stripe, elements} = this.props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      this.props.handleToken(result.token);
      this.props.hidePaymentDialog();
    }
  };

  render() {
    return (
      <div className='stripeCheckoutElement' onClick={e => e.stopPropagation()}>
        <button
          style={{ width: '26px', height: '26px', padding: '1px', border: 'none', float: 'right', backgroundColor: 'lightgrey'}}
          onClick={() => this.props.hidePaymentDialog()}
        ><i className='material-icons blue-grey-text' style={{ backgroundColor: 'lightgrey'}}>close</i></button>
        <div className="product-info">
          <h3 className="product-title">50 Credits</h3>
          <h4 className="product-price">€ 5,-</h4>
        </div>
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <button disabled={!this.props.stripe} className='btn white blue-grey-text buttonHoverWithShadow' style={{ width: '100%', marginBottom: '10px' }}> 
            Buy Now
          </button>
        </form>
      </div>
    );
  }
}

/*export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}

export default connect(mapStateToProps, actions)(
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <CheckoutForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
); */

// export default connect(state => ({...state.resp}),{...checkoutActions })(injectStripe(Form))

function mapStateToProps({ paymentDialog }) {
  return { paymentDialog };
}


const ConnectedCheckoutForm = connect(mapStateToProps, actions)(CheckoutForm);

const InjectedCheckoutForm = () => (
  <ElementsConsumer>
    {({stripe, elements}) => (
      <ConnectedCheckoutForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);

export default InjectedCheckoutForm;


//export default connect(mapStateToProps, actions)(CheckoutForm);

//https://github.com/stripe/react-stripe-js/blob/master/docs/migrating.md
