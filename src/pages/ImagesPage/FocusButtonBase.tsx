import React, { ReactNode } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(() =>
    createStyles({
        button: {
            left: '50%',
            position: 'relative',
            transform: 'translateX(-50%)',
            display: 'inline-block',
            width: '100%',
            '&:hover .focusHighlight': {
                opacity: 0.04,
            },
            '& .is-focused': {
                '& img': {
                    opacity: 0.8,
                },
            },
        },
    }),
);

type Props = {
    children: ReactNode;
    onDoubleClick: () => void;
};

const FocusButtonBase = ({ children, onDoubleClick }: Props): JSX.Element => {
    const classes = useStyles();

    return (
        <ButtonBase focusRipple className={classes.button} onClick={onDoubleClick}>
            <div>{children}</div>
        </ButtonBase>
    );
};

export default FocusButtonBase;
