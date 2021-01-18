import { SHOW_PAYMENT_DIALOG, HIDE_PAYMENT_DIALOG } from '../actions/types';

export default function(state = {visible: false}, action) {
    switch (action.type) {
        case SHOW_PAYMENT_DIALOG:
            return { visible: true }; // !state.visible
        case HIDE_PAYMENT_DIALOG:
            return { visible: false };
        default:
            return state;
    }
};