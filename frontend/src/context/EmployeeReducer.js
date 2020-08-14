import { SET_EMPLOYEES, ADD_EMPLOYEE, LOADING_DATA } from './ActionTypes';

const setEmployees = (employees, state) => {

    return {
        ...state,
        employees: employees
    }
}

const addEmployee = (employee, state) => {
    const newEmployee = [
        ...state.employee,
        employee
    ];
    return {
        ...state,
        employee: newEmployee
    }
};

export default (state, action) => {
    switch (action.type) {
        case ADD_EMPLOYEE:
            return addEmployee(action.payload, state);
        case SET_EMPLOYEES:
            return setEmployees(action.payload, state);
        case LOADING_DATA:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
}