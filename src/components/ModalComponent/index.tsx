import React, { ReactNode } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Colors from '../../constants/Colors';

type Props = {
    isOpen: boolean;
    handleClose: () => any;
    children: ReactNode;
    isKeepMounted?: boolean;
    className?: string;
    classNamePaper?: string;
};

const defaultProps = {
    isKeepMounted: false,
};

const useStyles = makeStyles(() =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: Colors.white,
            position: 'relative',
            '&:focus': {
                outline: 0,
            },
        },
    }),
);

const ModalComponent = ({
    isOpen,
    children,
    handleClose,
    isKeepMounted,
    className,
    classNamePaper,
}: Props): JSX.Element => {
    const classes = useStyles();
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={`${classes.modal} ${className}`}
            open={isOpen}
            keepMounted={isKeepMounted}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <div className={`${classes.paper} ${classNamePaper}`}>{children}</div>
            </Fade>
        </Modal>
    );
};

ModalComponent.defaultProps = defaultProps;

export default ModalComponent;
