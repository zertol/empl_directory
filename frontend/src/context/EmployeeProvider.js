import { createContext } from 'react';
import { ADD_EMPLOYEE } from './ActionTypes';
import EmployeeReducer from './EmployeeReducer';

//Create Context
const EmployeeContext = createContext({
    employees: [{
        id: "id",
        fname: "fname",
        lname: "lname",
        title: "title",
        email: "email@m.com",
        department: {
            name: "name"
        }
    }],
    addEmployee: (employee) => { }
});

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

export default employeeContext;