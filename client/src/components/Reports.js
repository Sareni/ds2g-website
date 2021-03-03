import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Reports extends Component {

    componentDidMount() {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        });

        window.addEventListener('resize', () => {
            this.setState({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
            });
        }, false);
    }

    render() {
        if (this.props.auth) {
            return (
                <div style={{ textAlign: 'center' }}>
                <h1>
                Reports
                </h1>
                <iframe src={ `/api/reports/?content=${this.props.auth.shinyKey.key}&iv=${this.props.auth.shinyKey.iv}`} width='100%' height={`${this.state.windowHeight - 200 - 100}px` } />
            </div>
            );
        }
        return (<div>...</div>);
        
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(Reports);

//export default Reports;