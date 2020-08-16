import React from 'react';
import NoImg from '../images/no-img.png';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        paddingLeft: 10
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    cover: {
        width: '75px',
        height: '75px',
        borderRadius: '50%',
        '& img': {
            objectFit: 'cover'
        }
    },
    fullname: {
        width: 60,
        height: 18,
        backgroundColor: "#ff4400",
        marginBottom: 7
    },
    title: {
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0,0,0, 0.3)',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: '90%',
        backgroundColor: 'rgba(0,0,0, 0.6)',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0, 0.6)',
        marginBottom: 10
    },
    [theme.breakpoints.down('xs')]:{
        card: {
            flexDirection: 'column',
            alignItems: 'start'
        },
        cover: {
            marginTop: 12,
            marginLeft:16
        },
        fullLine: {
            width: '80%'
        }
    }
}));

const EmployeeSkeleton = (props) => {
    const classes = useStyles();

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg} />
            <CardContent className={classes.cardContent}>
                <div className={classes.fullname} />
                <div className={classes.title} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />
            </CardContent>
        </Card>
    ));

    return <>{content}</>;
};
export default EmployeeSkeleton;