import React from 'react';
import PricingCard from './PricingCard';

const Pricing = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>
            Pricing!
            </h1>
            <div class="row">
                <PricingCard />
                <PricingCard />
                <PricingCard />
            </div>
        </div>
    );
};

export default Pricing;