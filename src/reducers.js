import { combineReducers } from 'redux';
import { ActionTypes } from './actions';

const rates = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.data.pending:
            return [];
        case ActionTypes.data.arrived:
            return action.bpi;
        default:
            return state;
    }
};

const input = (state = 0, action) => {
    switch (action.type) {
        case ActionTypes.input.change:
            return action.value;
        default:
            return state;
    }
};

const error = (state = null, action) => {
    switch (action.type) {
        case ActionTypes.error:
            return action.error;
        default:
            return state;
    }
};

export default combineReducers({
    rates,
    input,
    error
});