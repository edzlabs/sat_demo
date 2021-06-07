import React, { FC, useCallback } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch } from 'react-redux';
import Colors, { ColorTranslator } from '../../constants/Colors';
import Dropdown from '../../components/Dropdown';
import { changeServerName } from '../../store/gallerySlice';
import { getServers } from '../../services/api/Servers';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
        },
        root: {
            background: Colors.white,
            boxShadow: `0px 8px 10px ${new ColorTranslator(Colors.black).setA(0.14).RGBA}, 0px 3px 14px ${
                new ColorTranslator(Colors.black).setA(0.12).RGBA
            }, 0px 5px 5px ${new ColorTranslator(Colors.black).setA(0.2).RGBA}`,
            borderRadius: 4,
        },
    }),
);

const ServerNameMenu: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const ServerName = 'Server Name';

    const onSelected = useCallback((select: string): void => {
        dispatch(changeServerName(select === ServerName ? '' : select));
    }, []);

    const getItems = () => {
        return getServers();
    };

    const Items = [
        {
            name: ServerName,
            hidden: true,
        },
        ...getItems(),
    ];

    return (
        <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
            classes={{
                root: classes.root,
            }}
        >
            <Dropdown onChecked={onSelected} items={Items} />
        </FormControl>
    );
};

export default ServerNameMenu;
