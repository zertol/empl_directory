import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { setDepartments } from '../../redux/actions/departmentActions';
import {v4 as uuidv4} from 'uuid';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const DepartmentCombo = React.memo((props) => {

    const classes = useStyles();

    const { departmentsR: { departments, loading }, setDepartments, errorMessage, onChange, dep } = props;

    useEffect(() => {
        setDepartments();
        return () => { }
    }, [setDepartments]);

    const listDepartments = useMemo(() => {
        if (!loading && departments.length > 0) {
            return departments.map(department => {
                return (
                    <MenuItem key={uuidv4()} value={department._id}>{department.name}</MenuItem>
                )
            });
        } else {
            return null;
        }

    }, [departments]);

    return (
        <FormControl className={classes.formControl} error={errorMessage ? true : false}>
            <InputLabel id="department-label">Department</InputLabel>
            <Select
                labelId="department-label"
                id="department-select"
                value={dep}
                name="department"
                onChange={onChange}

            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {listDepartments}
            </Select>
            <FormHelperText>{errorMessage}</FormHelperText>
        </FormControl>
    )

});

const mapStateToProps = state => {
    return {
        departmentsR: state.departmentR
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDepartments: () => dispatch(setDepartments())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentCombo);