import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const MyNavButton = (props) => {
    const {children, tip, onClick} = props;

    return (
        <Tooltip title={tip}>
            <IconButton onClick={onclick}>
                {children}
            </IconButton>
        </Tooltip>
    )
    
};

export default MyNavButton;    