import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields'

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({label, name}) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        });
    }
    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
                >
                    {this.renderFields()}
                    <button type="submit" className="blue-grey btn-flat right white-text">
                        <i className="material-icons right">arrow_forward</i>
                        Next
                    </button>
                    <Link to="/surveys" className="grey btn-flat right white-text" style={{ marginRight: '10px' }}>
                        Cancel
                        <i className="material-icons right">cancel</i>
                    </Link>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    _.each(formFields, ({ name }) => {
        if(!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    errors.recipients = validateEmails(values.recipients || '');

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);