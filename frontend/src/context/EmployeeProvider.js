import React, { createContext, useReducer } from 'react';
import { ADD_EMPLOYEE } from './ActionTypes';
import EmployeeReducer from './EmployeeReducer';

const initialState = {
    employees: [],
    addEmployee: (employee) => { },
    loading: false
}

//Create Context
export const EmployeeContext = createContext(initialState);

//Provider Component
export const EmployeeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EmployeeReducer, initialState);

    return (
        <EmployeeContext.Provider value={
            {
                employees: state.employees,
                addEmployee: (employee) => {
                    dispatch({
                        type: ADD_EMPLOYEE,
                        payload: employee
                    })
                }
            }
        }>
            {children}
        </EmployeeContext.Provider>
    )
}