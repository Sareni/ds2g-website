import React from 'react';

const Reports = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>
            Reports
            </h1>
            <iframe src="/api/reports/" width='800px' height='600px'/>
        </div>
    );
};

export default Reports;