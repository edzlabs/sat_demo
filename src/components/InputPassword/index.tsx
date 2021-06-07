import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
        textField: {
            width: '25ch',
        },
        textFieldHelper: {
            marginTop: -4,
            paddingLeft: 14,
        },
    }),
);

interface State {
    showPassword: boolean;
}

type Props = {
    classes: any;
    error?: boolean;
    value: string;
    label: string;
    helperText?: string;
    onChange?: (value: any) => void;
};

const defaultProps = {
    error: false,
};

const InputPassword = ({ classes, value, error, helperText, onChange, label }: Props): JSX.Element => {
    const classesStyles = useStyles();
    const [values, setValues] = React.useState<State>({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <div className={classes.root}>
            <FormControl
                className={clsx(classesStyles.margin, classesStyles.textField)}
                classes={{ root: classes.root }}
                variant="outlined"
            >
                <InputLabel error={error} htmlFor="outlined-adornment-password">
                    {label}
                </InputLabel>
                <OutlinedInput
                    error={error}
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    autoComplete="off"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                />
            </FormControl>
            {error && (
                <FormHelperText
                    className={classesStyles.textFieldHelper}
                    error={error}
                    id="outlined-adornment-password"
                >
                    {helperText}
                </FormHelperText>
            )}
        </div>
    );
};

InputPassword.defaultProps = defaultProps;

export default InputPassword;
