import React, { useState } from 'react';
import MyNavButton from '../../util/MyNavButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import makeStyles from '@material-ui/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    editButton:{
        position: 'absolute',
        right:'10px',
        top: '10px'
    }
})

const EmployeeEdit = (props) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <MyNavButton tip="Edit Employee" tipClassName={classes.editButton} onClick={handleOpen}>
                <EditIcon />
            </MyNavButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="edit-employee-dialog">
                <MyNavButton tip="Close" tipClassName={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </MyNavButton>
                <DialogTitle id="edit-employee-dialog">Edit Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
          </Button> */}
                </DialogActions>
            </Dialog>
        </>
    )

};

export default EmployeeEdit;