import { ADD_EMPLOYEE, SET_EMPLOYEES, LOADING_DATA, UPDATE_EMPLOYEE, LOADING_UI,STOP_LOADING_UI, DELETE_EMPLOYEE, FILTER_EMPLOYEES } from '../types';

let requestBody = {
    query: ""
};

export const filterEmployees = (filteredEmployees) => dispatch => {
    dispatch({
        type: FILTER_EMPLOYEES,
        payload: filteredEmployees
    });
};

export const setEmployees = () => dispatch => {
    requestBody.query = `
    query{
        employees{
            _id
            fname
            lname
            title
            email
            location
            department{
                name
            }
        }
    }
`
    dispatch({
        type: LOADING_DATA,
    })
    fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(resData => {
            dispatch({
                type: SET_EMPLOYEES,
                payload: resData.data.employees
            })
        })
};

export const updateEmployee = (employee) => dispatch => {
    requestBody.query = `
    mutation{
        updateEmployee(employeeUpdate: {_id: "${employee._id}", fname: "${employee.fname}", lname: "${employee.lname}", email: "${employee.email}", location: "${employee.location}" }){
            _id
            fname
            lname
            title
            email
            location
            department{
                name
            }
        }
    }
`
    dispatch({
        type: LOADING_UI,
    })
    fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(resData => {
            dispatch({
                type: UPDATE_EMPLOYEE,
                payload: resData.data.updateEmployee
            });
            dispatch({
                type: STOP_LOADING_UI,
            });
        })
};

export const addEmployee = (employee) => dispatch =>{
    requestBody.query = `
    mutation{
        createEmployee(employeeInput: {fname: "${employee.fname}", lname: "${employee.lname}", email: "${employee.email}", departmentId: "${employee.department}", title: "${employee.title}", location: "${employee.location}"}){
            _id
            fname
            lname
            title
            email
            location
            department{
                name
            }
        }
    }
`
    dispatch({
        type: LOADING_UI,
    })
    fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(resData => {
            dispatch({
                type: ADD_EMPLOYEE,
                payload: resData.data.createEmployee
            });
            dispatch({
                type: STOP_LOADING_UI,
            });
        })
};

export const deleteEmployee = (id) => dispatch =>{
    requestBody.query = `
    mutation{
        deleteEmployee(id: "${id}")
    }
`
    dispatch({
        type: LOADING_UI,
    })
    fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(resData => {
            dispatch({
                type: DELETE_EMPLOYEE,
                payload: id
            });
            dispatch({
                type: STOP_LOADING_UI,
            });
        })
}; 