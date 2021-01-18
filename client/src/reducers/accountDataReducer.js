import { FETCH_ACCOUNT_DATA } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_ACCOUNT_DATA:
            return action.payload;
        default:
            return state;
    }
};