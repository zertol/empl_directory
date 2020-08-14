import React, { createContext, useReducer } from 'react';
import { ADD_EMPLOYEE, SET_EMPLOYEES, LOADING_DATA } from './ActionTypes';
import EmployeeReducer from './EmployeeReducer';

const initialState = {
    employees: [],
    loading: false,
    addEmployee: (employee) => { },
    setEmployees: (employees) => { },
    setLoading: (loading) => { },
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
                loading: state.loading,
                setLoading: (loading) => {
                    dispatch({
                        type: LOADING_DATA,
                        payload: loading
                    })
                },
                setEmployees: (employees) => {
                    dispatch({
                        type: SET_EMPLOYEES,
                        payload: employees
                    })
                },
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