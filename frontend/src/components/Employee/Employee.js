import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImg from '../../images/no-img.png';
import EmployeeEdit from './EmployeeEdit';

const useStyles = makeStyles({
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
    }

})

const Employee = (props) => {

    const classes = useStyles();
    const { employee } = props;

    return (
        <Card className={classes.card}>
            <CardMedia
                image={NoImg}
                title="Profile Image"
                className={classes.image} />

            <CardContent className={classes.CardContent}>
                <Typography variant="h5" color="primary">{employee.fname} {employee.lname}</Typography>
                {/* {deleteButton} */}
                <Typography variant="body1" color="textPrimary" component="p">{employee.title}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">Department: {employee.department.name}</Typography>
                <EmployeeEdit employee={employee} />
            </CardContent>
            
            
        </Card>
    )
};

export default Employee;    