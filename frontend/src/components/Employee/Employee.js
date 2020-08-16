import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImg from '../../images/no-img.png';
import EmployeeForm from './EmployeeForm';
import EmployeeDelete from './EmployeeDelete';

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        paddingLeft: 10
    },
    image: {
        width: '75px',
        height: '75px',
        borderRadius: '50%',
    },
    span:{
        marginRight: 15
    },
    [theme.breakpoints.down('xs')]:{
        card: {
            flexDirection: 'column',
            alignItems: 'start'
        },
        image: {
            marginTop: 12,
            marginLeft:16
        },
        span: {
            display: 'block',
            marginRight: 0,
            marginTop: 5,
            fontSize: '14px'
        }
    }

}));

const Employee = React.memo((props) => {
    const classes = useStyles();
    const { employee } = props;

    return (
        <Card className={classes.card}>
            <CardMedia
                image={NoImg}
                title="Profile Image"
                className={classes.image} />

            <CardContent>
                <Typography variant="h5" color="primary">{employee.fname} {employee.lname}</Typography>
                <Typography variant="body1" color="textPrimary" component="p">{employee.title}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">Department: {employee.department.name}</Typography>
                <span className={classes.span}>Location: {employee.location}</span>
                <span className={classes.span}>Email: {employee.email ? employee.email : "N/A"}</span>
                <EmployeeForm employee={employee} dialogTitle="Edit Employee" editDialog />
                <EmployeeDelete id={employee._id} />
            </CardContent>


        </Card>
    )
});

export default Employee;    