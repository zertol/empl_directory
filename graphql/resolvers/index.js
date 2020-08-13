const Employee = require('../../models/employee');
const Department = require('../../models/department');
const mongoose = require('mongoose');


/**
 * The below allows relational drilling wihtin grapql in a way when we request a property with a relation to another model we can
 * retrieve the data we want.
 * 
 */
const employeesO = async (employeeIds) => {
    try {
        const employees = await Employee.find({ _id: { $in: employeeIds } });

        return employees.map(employee => {
            return {
                ...employee._doc,
                _id: employee.id,
                department: departmentO.bind(this, employee._doc.department)
            }
        });
    }
    catch (err) {
        throw err;
    }
};

const departmentO = async (departmentId) => {
    try {
        const department = await Department.findById(departmentId);
        console.log(1);
        return {
            ...department._doc,
            _id: department.id, //Virtual id stored by mongoose linking to the original
            employees: employeesO.bind(this, department._doc.employees)
        }
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    //Fetch employees
    employees: async () => {
        try {
            const employees = await Employee.find();

            return employees.map(employee => {
                return {
                    ...employee._doc,
                    _id: employee.id,
                    department: departmentO.bind(this, employee._doc.department)
                }
            })

        } catch (err) {
            throw err;
        }
    },

    //Add a new employee with a department
    createEmployee: async args => {
        let employee = new Employee({
            fname: args.employeeInput.fname,
            lname: args.employeeInput.lname,
            title: args.employeeInput.title,
            location: args.employeeInput.location,
            department: args.employeeInput.departmentId,
        });
        let employeeCreated;
        try {
            const empl = await employee.save();

            employeeCreated = {
                ...empl._doc,
                _id: empl.id,
                department: departmentO.bind(this, empl._doc.department)
            };

            const departmentF = await Department.findById(args.employeeInput.departmentId);

            if (!departmentF) {
                throw new Error("Department not found");
            }
            departmentF.employees.push(employee);
            await departmentF.save();

            return employeeCreated;

        } catch (err) {
            throw err;
        }

    },

    //Update an employee
    updateEmployee: async args => {
        try {
            let employee = await Employee.findOneAndUpdate({
                _id: args.employeeUpdate.id
            },
                {
                    $set: {
                        fname: args.employeeUpdate.fname,
                        lname: args.employeeUpdate.lname,
                        email: args.employeeUpdate.email
                    }
                },
                { new: true }, (err, empl) => {
                    if (err) {
                        throw err;
                    }
                });
            return {
                ...employee._doc,
                _id: employee.id,
                department: departmentO.bind(this, employee._doc.department)
            }

        } catch (err) {
            throw err;
        }
    },

    //Delete an employee
    deleteEmployee: async args => {
        try {
            const employee = await Employee.findOneAndDelete({
                _id: args.id
            });

            const objId = mongoose.Types.ObjectId(args.id);

            await Department.update({_id: employee._doc.department}, {
                $pull: {
                    "employees": objId
                }
            }, (err, empl) => {
                if (err) {
                    throw err;
                }
            });

            return true;

        } catch (err) {
            return false;
        }
    },

    //Create a new department
    createDepartment: async args => {
        let department = new Department({
            name: args.name
        });
        try {
            const dep = await department.save();

            return {
                ...dep._doc,
                _id: dep.id
            }
        } catch (err) {
            throw err;
        }
    }
}