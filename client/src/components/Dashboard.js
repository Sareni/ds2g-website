import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

// fixed-action-btn
const Dashboard = () => {
    return (
        <div>
            <SurveyList />
            <div className="center-align"> 
                <Link to="/surveys/new" className="btn-floating btn-large red">
                    <i className="material-icons white blue-grey-text">add</i>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;