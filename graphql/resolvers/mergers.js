const Employee = require('../../models/employee');
const Department = require('../../models/department');

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

//Transform an employee into the object schema we want
const transformEmployee = (employee) => {
    return {
        ...employee._doc,
        _id: employee.id,
        department: departmentO.bind(this, employee._doc.department)
    }
}

exports.employeesO = employeesO;
exports.departmentO = departmentO;
exports.transformEmployee = transformEmployee;