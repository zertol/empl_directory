import { LOADING_DATA, SET_DEPARTMENTS } from '../types';

const initialState = {
    departments: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state
            }
        case SET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload
            }

        default:
            return state;
    }
};