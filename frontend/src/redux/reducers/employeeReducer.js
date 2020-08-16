import { LOADING_DATA, SET_EMPLOYEES, ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE, FILTER_EMPLOYEES } from '../types';

const initialState = {
    employees: [],
    filteredEmployees: [],
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_EMPLOYEES:
            return {
                ...state,
                loading: false,
                employees: action.payload,
                filteredEmployees: action.payload
            }

        case ADD_EMPLOYEE:
            return {
                ...state,
                loading: false,
                employees: [
                    ...state.employees,
                    action.payload
                ],
                filteredEmployees: [
                    ...state.employees,
                    action.payload
                ]
            }

        case UPDATE_EMPLOYEE:

            const index = state.employees.findIndex(employee => employee._id === action.payload._id);
            const employees = [...state.employees];
            employees[index] = action.payload;

            return {
                ...state,
                loading: false,
                employees: employees,
                filteredEmployees: employees
            }

        case DELETE_EMPLOYEE:
            return {
                ...state,
                loading: false,
                employees: state.employees.filter(employee => employee._id !== action.payload),
                filteredEmployees: state.employees.filter(employee => employee._id !== action.payload)
            }

        case FILTER_EMPLOYEES:
            return {
                ...state,
                loading: false,
                filteredEmployees: action.payload
            }

        default:
            return state;
    }
};