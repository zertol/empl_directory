import React, { useState, useEffect, Suspense, lazy } from 'react';
import MyNavButton from '../../util/MyNavButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import makeStyles from '@material-ui/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { deleteEmployee } from '../../redux/actions/employeeActions';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    deleteButton: {
        position: 'absolute',
        right: '50px',
        top: '10px'
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    }
});

const EmployeeDelete = (props) => {

    const classes = useStyles();

    const { uiR: { loading } } = props;

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const deleteEmployee = () => {
        props.deleteEmployee(props.id);
    }

    return (
        <>
            <MyNavButton tip="Delete Employee" onClick={handleOpen} tipClassName={classes.deleteButton}>
                <DeleteOutline color="primary" />
            </MyNavButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="delete-employee-title" fullWidth maxWidth="sm">
                <DialogTitle id="delete-employee-title">Are you sure you want to delete this employee?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteEmployee} color="secondary">
                        Delete{loading ? <CircularProgress size={20} className={classes.progress} /> : null}
                 </Button>
                </DialogActions>
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
        deleteEmployee: (id) => dispatch(deleteEmployee(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDelete);
