import { ADD_PERSON, ADD_EMPLOYEE } from './actionTypes';

const addEmployee = (employee,state) => {
    const newEmployee = [
        ...state.employee,
        employee
    ];
    return {
        ...state,
        people: newEmployee
    }
}

export default (state, action) => {
    switch (action.type) {
        case ADD_EMPLOYEE:
            return addEmployee(action.payload, state);
        default:
            return state;
    }
}