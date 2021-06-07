import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from './useStyles';

interface Props {
    isCheckbox: boolean;
}

const ButtonSingle = ({ isCheckbox }: Props): JSX.Element => {
    const classes = useStyles();
    return (
        <>
            {isCheckbox && <Checkbox checked={isCheckbox} color="primary" className={classes.checkbox} />}
            {!isCheckbox && (
                <IconButton size="small" aria-label="add" className={classes.iconButton}>
                    <AddIcon />
                </IconButton>
            )}
        </>
    );
};

export default ButtonSingle;
