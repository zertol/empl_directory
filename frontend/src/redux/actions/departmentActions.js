import { SET_DEPARTMENTS } from '../types';

let requestBody = {
    query: ""
}

export const setDepartments = () => dispatch => {
    requestBody.query = `
    query{
        departments{
            _id
            name
        }
    }
`
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
                type: SET_DEPARTMENTS,
                payload: resData.data.departments
            })
        })
};