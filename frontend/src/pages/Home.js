import React, { useEffect, useMemo, useState } from 'react';
import Employee from '../components/Employee/Employee';
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux';
import { setEmployees, filterEmployees } from '../redux/actions/employeeActions';
import { v4 as uuidv4 } from 'uuid';
import EmployeeSkeleton from '../util/EmployeeSkeleton';
import TextFilter from '../util/TextFilter';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination'
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles( theme =>({
    progress: {
        position: 'absolute',
        top: 10,
        left: '50%',
    },
    gridContainer: {
        position: 'relative'
    },
    pagination: {
        marginBottom: 15
    }
}));

const Home = (props) => {

    const classes = useStyles();

    const { employeeR: { employees, loading, filteredEmployees }, setEmployees, filterEmployees } = props;

    const [searchTerm, setSearchTerm] = useState("");

    const [page, setPage] = useState(1);

    const rowsPerPage = 3;

    useEffect(() => {
        setEmployees();
        return () => { }
    }, [setEmployees]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const searchListHandler = (filterVal) => {
        setSearchTerm(filterVal);
        const results = employees.filter(employee =>
            employee.fname.toLowerCase().includes(filterVal.toLowerCase()) ||
            employee.lname.toLowerCase().includes(filterVal.toLowerCase()) ||
            employee.email.toLowerCase().includes(filterVal.toLowerCase()) ||
            employee.location.toLowerCase().includes(filterVal.toLowerCase()) ||
            employee.title.toLowerCase().includes(filterVal.toLowerCase()) ||
            employee.department.name.toLowerCase().includes(filterVal.toLowerCase())
        );

        filterEmployees(results);
    };

    const listEmployees = useMemo(() => {
        if (!loading && filteredEmployees.length > 0) {
            let mappedEmployees = searchTerm ? filteredEmployees : filteredEmployees.slice(((page - 1) * (rowsPerPage)), ((page - 1) * (rowsPerPage) + rowsPerPage));

            return mappedEmployees.map(employee => {
                return (
                    <Employee key={uuidv4()} employee={employee}></Employee>
                )
            });
        } else {
            return "Operation yielded no results.";
        }

    }, [filteredEmployees, page]);


    return (
        <Grid container spacing={4} className={classes.gridContainer}>
            <Grid item xs={12}>
                {<TextFilter searchHandler={searchListHandler} disabled={loading || filterEmployees.length === 0} />}
            </Grid>
            <Grid item sm={8} xs={12}>
                <Pagination className={classes.pagination} count={Math.ceil(filteredEmployees.length / rowsPerPage)} page={page} onChange={handleChangePage} />
                {loading ? <EmployeeSkeleton /> : listEmployees}
            </Grid>
            <Grid item sm={4} xs={12}>
            </Grid>
            {loading ? <CircularProgress size={30} className={classes.progress} /> : null}
        </Grid>
    )
};

const mapStateToProps = state => {
    return {
        employeeR: state.employeeR
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setEmployees: () => dispatch(setEmployees()),
        filterEmployees: (filteredEmployees) => dispatch(filterEmployees(filteredEmployees))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);    