import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer'
import paymentDialogReducer from './paymentDialogReducer';
import accountDataReducer from './accountDataReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer,
    paymentDialog: paymentDialogReducer,
    accountData: accountDataReducer
});