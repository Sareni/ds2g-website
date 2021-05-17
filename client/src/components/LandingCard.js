import React from 'react';
import testImg from './db_test.jpg';

const LandingCard = () => {
    return (
        <div class="col s1 m1 l1" style={{marginTop: '100px'}}>
            <div class="card horizontal z-depth-0">
                <div class="card-image">
                    <img src={ testImg } />
                </div>
                <div class="card-content">
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
                </div>
            </div>
        </div>
    );
};

export default LandingCard;