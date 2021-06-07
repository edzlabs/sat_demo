import React, { useState, useCallback, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import useStyles from './useStyles';

export interface PropsItems {
    name: string;
    hidden?: boolean;
}

interface Props {
    items: PropsItems[];
    onChecked: (select: string) => void;
}

/**
 * example
 */
// const Items = [
//     {
//         name: 'Server Name',
//         hidden: true,
//     },
//     {
//         name: 'test',
//     },
//     {
//         name: 'test1',
//     },
//     {
//         name: 'test2',
//     },
// ];

const Dropdown = ({ items, onChecked }: Props): JSX.Element => {
    const classes = useStyles();
    const [serverName, setServerName] = useState<string>('');
    const [isFocus, setFocus] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setFocus(true);
    }, []);
    const handleClose = useCallback((text: string) => {
        setAnchorEl(null);
        setServerName(text);
        onChecked(text);
        setFocus(false);
    }, []);

    useEffect(() => {
        const hiddenItemsName = (items as any).find((el: PropsItems) => el.hidden).name;
        setServerName(hiddenItemsName);
    }, []);

    return (
        <div className={classes.root}>
            <Button
                className={`${isFocus ? classes.rootButton : ''}`}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                classes={{ root: classes.wrap, label: classes.label, endIcon: classes.endIcon }}
                variant="outlined"
                endIcon={<ArrowDropDownIcon className={classes.icon} />}
            >
                {serverName}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                classes={{
                    list: classes.menu,
                    paper: classes.menuPaper,
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                variant="menu"
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleClose(serverName)}
                getContentAnchorEl={null}
            >
                {(items as any).map((items: PropsItems) => {
                    return (
                        !items.hidden && (
                            <MenuItem
                                key={items.name}
                                className={`${classes.menuItem}`}
                                selected={items.name === serverName}
                                onClick={() => handleClose(items.name)}
                            >
                                {items.name}
                            </MenuItem>
                        )
                    );
                })}
            </Menu>
        </div>
    );
};

export default Dropdown;
