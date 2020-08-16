import React, { useState, Suspense, lazy } from 'react';
import MyNavButton from '../../util/MyNavButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import makeStyles from '@material-ui/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useForm } from '../../hooks';
import { connect } from 'react-redux';
import { updateEmployee, addEmployee } from '../../redux/actions/employeeActions';
import CircularProgress from '@material-ui/core/CircularProgress';

const DepartmentCombo = lazy(() => import('../Department/DepartmentCombo'));

const useStyles = makeStyles({
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    editButton: {
        position: 'absolute',
        right: '10px',
        top: '10px'
    },
    progressSpinner: {
        position: 'absolute'
    },
    textField: {
        marginRight: 10,
        marginBottom: 20
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    }

});

const EmployeeForm = (props) => {

    const classes = useStyles();

    const { uiR: { loading }, updateEmployee, addEmployee, dialogTitle, editDialog } = props;
    const initialState = {
        fname: editDialog ? props.employee.fname : '',
        lname: editDialog ? props.employee.lname : '',
        email: editDialog ? props.employee.email : '',
        title: '',
        location: editDialog ? props.employee.location : '',
        department: ''
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const validateEmployee = (values) => {
        let errors = {};
        if (values.fname.trim() === "") {
            errors.fname = "First Name Must Not be empty!";
        }

        if (values.lname.trim() === "") {
            errors.lname = "Last Name Must Not be empty!";
        }

        if (values.location.trim() === "") {
            errors.location = "Location must not be empty.";
        }

        if (!editDialog) {

            if (values.title.trim() === "") {
                errors.title = "Title must not be empty!";
            }

            if (values.department.trim() === "") {
                errors.department = "Please select a Department.";
            }
        }

        return errors;
    }

    const addEmployeeCallback = () => {
        const employeeToSend = {
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            title: values.title,
            department: values.department,
            location: values.location
        }

        addEmployee(employeeToSend);
        handleClose();
    };


    const editEmployeeCallback = () => {
        const employeeToSend = {
            _id: props.employee._id,
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            location: values.location
        }

        updateEmployee(employeeToSend);
        handleClose();    
        
    };

    const employeeCallback = () => {
        if (editDialog) {
            editEmployeeCallback();
        } else {
            addEmployeeCallback();
        }
    }

    const { onSubmit, onChange, errors, values } = useForm(employeeCallback, initialState, validateEmployee)

    return (
        <>
            <MyNavButton tip={dialogTitle} tipClassName={editDialog ? classes.editButton : ""} onClick={handleOpen}>
                {editDialog ? <EditIcon /> : <AddIcon />}
            </MyNavButton>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby={editDialog ? "add-employee-dialog" : "edit-employee-dialog"}>
                <MyNavButton tip="Close" tipClassName={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </MyNavButton>
                <DialogTitle id={editDialog ? "add-employee-dialog" : "edit-employee-dialog"}>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <TextField
                            error={errors.fname}
                            id="fname"
                            name="fname"
                            label="First Name"
                            helperText={errors.fname}
                            value={values.fname}
                            onChange={onChange}
                            className={classes.textField}
                        />

                        <TextField
                            error={errors.lname}
                            id="lname"
                            name="lname"
                            label="Last Name"
                            helperText={errors.lname}
                            value={values.lname}
                            onChange={onChange}
                            className={classes.textField}
                        />

                        <TextField
                            error={errors.email}
                            type="email"
                            id="email"
                            name="email"
                            label="Email Address"
                            helperText={errors.email}
                            value={values.email}
                            onChange={onChange}
                            className={classes.textField}
                        />

                        <TextField
                            error={errors.location}
                            id="location"
                            name="location"
                            label="Location"
                            helperText={errors.location}
                            value={values.location}
                            onChange={onChange}
                            className={classes.textField}
                        />

                        {
                            !editDialog ? (<>

                                <TextField
                                    error={errors.title}
                                    id="title"
                                    name="title"
                                    label="Title"
                                    helperText={errors.title}
                                    value={values.title}
                                    onChange={onChange}
                                    className={classes.textField}
                                />
                                <Suspense fallback="<div>Loading Departments...</div>">
                                    <DepartmentCombo errorMessage={errors.department} onChange={onChange} dep={values.department} />
                                </Suspense></>) : null
                        }

                        <DialogActions>
                            <Button disabled={loading} type="submit" color="primary">Save{loading ?
                                <CircularProgress size={20} className={classes.progress} /> : null}</Button>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                        </DialogActions>
                    </form>

                </DialogContent>
            </Dialog>
        </>
    )

};

const mapStateToProps = state => {
    return {
        uiR: state.uiR
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateEmployee: (employee) => dispatch(updateEmployee(employee)),
        addEmployee: (employee) => dispatch(addEmployee(employee))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);