import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const MyNavButton = (props) => {
    const {children, tip, onClick, tipClassName} = props;

    return (
        <Tooltip title={tip} className={tipClassName}>
            <IconButton onClick={onClick}>
                {children}
            </IconButton>
        </Tooltip>
    )
    
};

export default MyNavButton;    