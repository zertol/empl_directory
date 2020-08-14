import React, { useContext, useEffect } from 'react';
import { EmployeeContext } from '../context/EmployeeProvider';
import Employee from '../components/Employee/Employee';
import Grid from '@material-ui/core/Grid'


const Home = (props) => {

    const employeeContext = useContext(EmployeeContext);
    let requestBody = {
        query: `
            query{
                employees{
                    _id
                    fname
                    lname
                    title
                    email
                    department{
                        name
                    }
                }
            }
        `
    }

    useEffect(() => {
        employeeContext.setLoading(true);
        fetch("http://localhost:4000/graphql", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(resData => {
                employeeContext.setLoading(false);
                employeeContext.setEmployees(resData.data.employees);
            })

        return () => {
        }
    }, []);

    let employees = null;
    if (!employeeContext.loading && employeeContext.employees.length > 0) {
        employees = employeeContext.employees.map(employee => {
            return (
                <Employee key={employee._id.substring(0, 6)} employee={employee}></Employee>
            )
        });
    }

    return (
        <Grid container spacing={4}>
            <Grid item sm={8} xs={12}>
                {employees}
            </Grid>
            <Grid item sm={4} xs={12}>
            </Grid>
        </Grid>
    )
};

export default Home;    