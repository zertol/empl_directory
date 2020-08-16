import React, { useRef, useState, useCallback } from 'react';

import makeStyles from '@material-ui/styles/makeStyles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    textField: {
        marginRight: 10,
        marginBottom: 20
    }

});

const TextFilter = React.memo((props) => {

    const classes = useStyles();

    const { searchHandler, disabled } = props;

    const [filterValue, setFilterValue] = useState('');

    const onChange = (event) => {
        setFilterValue(event.target.value);
        searchHandler(event.target.value)
    }


    return (
        <>
        <TextField
                            id="filter-value"
                            name="filter-value"
                            label="Search Employee"
                            value={filterValue}
                            onChange={onChange}
                            className={classes.textField}
                            disabled={disabled}
                        />
        </>
    )
});

export default TextFilter;