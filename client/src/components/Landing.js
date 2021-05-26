import React from 'react';
import LandingCard from './LandingCard';
import dbImage from './dbImage.png';
import barImage from './barImage.png';
import nnImage from './nnImage.png';

const texts = [
    'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
]

const Landing = () => {
    return (
        <div>
            <div class="col">
                <LandingCard image={dbImage} text={texts[0]} />
                <LandingCard image={barImage} text={texts[0]} />
                <LandingCard image={nnImage} text={texts[0]} />
            </div>
        </div>
    );
};

export default Landing;