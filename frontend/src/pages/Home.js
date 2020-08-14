import React, { useContext,useEffect } from 'react';
import { EmployeeContext } from '../context/EmployeeProvider';
import Employee from '../components/Employee/Employee';


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
        employeeContext.loading = true;
        fetch("http://localhost:4000/graphql",{
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
              },
        }).then(res => res.json())
        .then(resData =>{
            employeeContext.loading = false;
            employeeContext.employees = resData.data.employees.map(employee => {
                return {
                    ...employee,
                    id: employee._id
                }
            });
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
        <>
        {employees}
        </>
    )
};

export default Home;    