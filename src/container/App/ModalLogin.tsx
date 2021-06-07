import React, { useState, useEffect, useCallback } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import ModalComponent from '../../components/ModalComponent';
import InputPassword from '../../components/InputPassword';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    LoginAsync,
    getServerName,
    getLoginError,
    setLoginError,
    getLogin,
    setUserName,
    getUserParams,
} from '../../store/gallerySlice';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Colors, { ColorTranslator } from '../../constants/Colors';

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            width: '100%',
            position: 'relative',
        },
        formLoad: {
            filter: 'blur(4px)',
            pointerEvents: 'none',
        },
        formLoadProgress: {
            position: 'absolute',
            left: 'calc(50% - 48px)',
            top: 'calc(50% - 48px)',
        },
        formWrap: {
            marginRight: 120,
            display: 'block',
        },
        formTitle: {
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 20,
            lineHeight: '24px',
            display: 'block',
            paddingLeft: 15,
            paddingBottom: 15,
            borderBottom: '1px solid ' + new ColorTranslator(Colors.black).setA(0.08).RGBA,
            color: Colors.dark,
            marginBottom: 35,
            width: '60%',
        },
        formLabel: {
            '&~ *': {
                marginTop: 11,
                width: '100%',
            },
        },
        formControlLabel: {
            marginRight: 43,
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: '0.1px',
        },
        formControlLabelRoot: {
            width: '100%',
        },
        formText: {
            width: '100%',
            marginRight: 16,
        },
        formTextPass: {
            marginLeft: 1,
        },
        formSubmit: {
            display: 'inline-block',
            marginLeft: 'auto',
            marginTop: 36,
        },
        alert: {
            marginTop: 16,
            marginBottom: -28,
        },
    }),
);

const Modal = styled.div`
    min-width: 535px;
    padding: 48px 10px 10px 50px;
    border-radius: 4px;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    background: ${Colors.white};
    box-shadow: 0 24px 38px ${new ColorTranslator(Colors.dark).setA(0.14).RGBA},
        0 9px 46px ${new ColorTranslator(Colors.dark).setA(0.12).RGBA},
        0 11px 15px ${new ColorTranslator(Colors.dark).setA(0.2).RGBA};
`;

type Props = {
    isOpenModal: boolean;
    modalClose: () => void;
};

interface State {
    username: string;
    errorTextUsername: string;
    password: string;
    errorTextPassword: string;
    isUsername: boolean;
    isPassword: boolean;
}

const defaultProps = {
    isOpenModal: false,
};

enum ErrorText {
    required = 'Field is required',
    minLength = 'Field must have at least 1 letters',
}

enum HandleErrorText {
    errorTextUsername = 'errorTextUsername',
    errorTextPassword = 'errorTextPassword',
}
enum HandleError {
    isUsername = 'isUsername',
    isPassword = 'isPassword',
}

const ModalLogin = ({ isOpenModal, modalClose }: Props): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const serverName = useSelector(getServerName);
    const userParams = useSelector(getUserParams);
    const isLoginError = useSelector(getLoginError);
    const isLogin = useSelector(getLogin);
    const [isLoad, setLoad] = useState<boolean>(false);
    const [values, setValues] = useState<State>({
        username: '',
        errorTextUsername: '',
        password: '',
        errorTextPassword: '',
        isUsername: true,
        isPassword: true,
    });

    const clearForm = () => {
        setValues({
            ...values,
            username: '',
            errorTextUsername: '',
            password: '',
            errorTextPassword: '',
            isUsername: true,
            isPassword: true,
        });
    };

    useEffect(() => {
        setTimeout(() => {
            clearForm();
        }, 100);
    }, [isOpenModal]);

    useEffect(() => {
        if (isLogin) {
            modalClose();
            setLoad(false);
            dispatch(setUserName(values.username));
        }
    }, [isLogin, isLoginError]);

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleErrorText = (prop: HandleErrorText, errorText: string): void => {
        setValues((prevState) => ({
            ...prevState,
            [prop]: errorText,
        }));
    };

    const handleError = (prop: HandleError, isError: boolean): void => {
        setValues((prevState) => ({
            ...prevState,
            [prop]: isError,
        }));
    };

    const handleClose = useCallback((): void => {
        modalClose();
    }, []);

    const validation = () => {
        handleErrorText(HandleErrorText['errorTextUsername'], '');
        handleErrorText(HandleErrorText['errorTextPassword'], '');
        let isValid = true;

        if (!values.username.length) {
            handleError(HandleError['isUsername'], false);
            handleErrorText(HandleErrorText['errorTextUsername'], ErrorText['required']);
            isValid = false;
        } else {
            if (values.username.length < 1) {
                handleError(HandleError['isUsername'], false);
                handleErrorText(HandleErrorText['errorTextUsername'], ErrorText['minLength']);
                isValid = false;
            } else {
                handleError(HandleError['isUsername'], true);
            }
        }

        if (!values.password.length) {
            handleError(HandleError['isPassword'], false);
            handleErrorText(HandleErrorText['errorTextPassword'], ErrorText['required']);
            isValid = false;
        } else {
            if (values.password.length < 1) {
                handleError(HandleError['isPassword'], false);
                handleErrorText(HandleErrorText['errorTextPassword'], ErrorText['minLength']);
                isValid = false;
            } else {
                handleError(HandleError['isPassword'], true);
            }
        }

        return isValid;
    };

    const onSubmit = async () => {
        setLoad(true);
        dispatch(setLoginError(false));
        if (await validation()) {
            await dispatch(
                LoginAsync({ serverName, login: values.username, password: values.password, isLogin, userParams }),
            );
        }
        setLoad(false);
    };
    return (
        <ModalComponent isOpen={isOpenModal} handleClose={handleClose}>
            <Modal>
                <FormControl className={classes.form} component="form">
                    {isLoad && <CircularProgress className={classes.formLoadProgress} />}
                    <div className={`${isLoad ? classes.formLoad : undefined}`}>
                        <FormControl className={classes.formWrap}>
                            <FormLabel component="legend" className={classes.formTitle}>
                                Login
                            </FormLabel>
                            <FormControlLabel
                                className={classes.formLabel}
                                classes={{
                                    label: classes.formControlLabel,
                                    root: classes.formControlLabelRoot,
                                }}
                                control={
                                    <TextField
                                        error={!values.isUsername}
                                        value={values.username}
                                        onChange={handleChange('username')}
                                        classes={{
                                            root: classes.formText,
                                        }}
                                        autoComplete="off"
                                        label="Username"
                                        id="outlined-size-normal"
                                        variant="outlined"
                                        helperText={values.errorTextUsername}
                                    />
                                }
                                label="Username:"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                classes={{
                                    label: classes.formControlLabel,
                                }}
                                control={
                                    <InputPassword
                                        label="Password"
                                        error={!values.isPassword}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        classes={{
                                            root: `${classes.formText} ${classes.formTextPass}`,
                                        }}
                                        helperText={values.errorTextPassword}
                                    />
                                }
                                label="Password:"
                                labelPlacement="start"
                            />
                        </FormControl>
                        {isLoginError && (
                            <Alert className={classes.alert} severity="error">
                                Invalid login
                            </Alert>
                        )}
                    </div>
                    <Button
                        onClick={onSubmit}
                        className={`${classes.formSubmit} ${isLoad ? classes.formLoad : undefined}`}
                        color="primary"
                    >
                        SUBMIT
                    </Button>
                </FormControl>
            </Modal>
        </ModalComponent>
    );
};

ModalLogin.defaultProps = defaultProps;

export default ModalLogin;
