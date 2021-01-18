import React from 'react';
import DocumentationCard from './DocumentationCard';

const Documentation = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>
                Documentation!
            </h1>
            <div class="row">
                <DocumentationCard />
                <DocumentationCard />
                <DocumentationCard />
                <DocumentationCard />
                <DocumentationCard />
                <DocumentationCard />
                <DocumentationCard />
                <DocumentationCard />
            </div>
        </div>
    );
};

export default Documentation;