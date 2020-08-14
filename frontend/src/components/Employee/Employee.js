import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImg from '../../images/no-img.png';

const useStyles = makeStyles(theme => {
    return {
        ...theme,
        card: {
            position: 'relative',
            display: 'flex',
            marginBottom: 20
        },
        image: {
            minWidth: 200
        }
    }
})

const Employee = (props) => {

    const classes = useStyles();
    const {employee} = props;

    return (
        <Card className={classes.card}>
            <CardMedia
                image={NoImg}
                title="Profile Image"
                className={classes.image} />

            <CardContent className={classes.CardContent}>
                <Typography variant="h5" color="primary">{employee.fname} {employee.lname}</Typography>
                {/* {deleteButton} */}
                <Typography variant="body2" color="textSecondary" component="p">{employee.title}</Typography>
                <Typography variant="body1" color="textPrimary" component="p">Department: {employee.department}</Typography>
                {/* <LikeButton screamId={scream.screamId} />
                <span>{scream.likeCount}</span>
                <MyButton tip="Comments">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{scream.commentCount} comments</span>
                <ScreamDialog screamId={scream.screamId} userHandle={scream.userHandle} openDialog={this.props.openDialog} /> */}
            </CardContent>
        </Card>
    )
};

export default Employee;    