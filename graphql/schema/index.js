const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        input EmployeeInput{
            fname: String!
            lname: String!
            title: String!
            email: String
            location: String!
            departmentId: String!
        }

        input EmployeeUpdate{
            id: ID!
            fname: String!
            lname: String!
            email: String
        }

        type Employee{
            _id: ID!
            fname: String!
            lname: String!
            title: String!
            email: String
            location: String!
            department: Department!
        }

        type Department{
            _id: ID!
            name: String!
            employees: [Employee!]!
        }

        type RQuery{
            employees: [Employee!]!
            departments: [Department!]!
        }

        type MQuery{
            createEmployee(employeeInput: EmployeeInput): Employee
            createDepartment(name: String): Department
            updateEmployee(employeeUpdate: EmployeeUpdate): Employee
            deleteEmployee(id: ID): Boolean
        }

        schema {
            query: RQuery
            mutation: MQuery
        }
    `);