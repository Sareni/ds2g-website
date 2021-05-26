import React from 'react';

const LandingCard = (props) => {
    return (
        <div class="col s1 m1 l1" style={{marginTop: '100px'}}>
            <div class="card horizontal z-depth-0">
                <div class="card-image">
                    <img src={ props.image } />
                </div>
                <div class="card-content">
                <p>{props.text}</p>
                </div>
            </div>
        </div>
    );
};

export default LandingCard;