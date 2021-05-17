import React from 'react';
import ShowroomCard from './ShowroomCard';

const Showroom = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>
            Projects
            </h1>
            <div class="row">
                <ShowroomCard />
                <ShowroomCard />
                <ShowroomCard />
                <ShowroomCard />
            </div>
        </div>
    );
};

export default Showroom;