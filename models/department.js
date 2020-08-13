const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    employees:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Employee'
        }
    ]
});

module.exports = mongoose.model('Department', departmentSchema);
