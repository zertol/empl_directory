const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
