import React, { FC, useState, useEffect, useCallback } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import InputBase from '@material-ui/core/InputBase';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import { setLoginError, getServerName, getUserName, getLogin, Logout } from '../../store/gallerySlice';
import { useDispatch, useSelector } from 'react-redux';
import ServerNameMenu from './ServerNameMenu';
import Logo from '../../assets/images/logo.svg';
import Colors, { ColorTranslator } from '../../constants/Colors';
import ModalLogin from './ModalLogin';
import ArrowTop from '../../assets/images/arrow-top.png';
import { useScreenMediaQuery } from '../../utils/MediaQuery';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            paddingTop: theme.spacing(1.3),
            width: '100%',
            marginBottom: 43,
        },
        logo: {
            display: 'block',
            width: 26.4,
            height: 26.4,
            fill: 'currentColor',
            borderStyle: 'none',
        },
        link: {
            cursor: 'pointer',
            transition: 'opacity 250ms',
            padding: '.4rem',
            position: 'relative',
            zIndex: 1,
            display: 'block',
            transform: 'translateX(-5px)',
            '&:hover': {
                opacity: 0.7,
            },
        },
        container: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            fontSize: 19.8,
            lineHeight: 1.2,
            letterSpacing: 0.18,
            marginLeft: 29,
            color: Colors.white,
            fontWeight: 'normal',
        },
        toolBar: {
            minHeight: 0,
        },
        toolBarAction: {
            alignItems: 'center',
            marginTop: -7,
        },
        colorBase: {
            color: Colors.greyBlueLight,
        },
        colorDark: {
            color: Colors.dark,
            transition: '.3s all',
        },
        search: {
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 5,
        },
        inputRoot: {
            color: grey[300],
            background: Colors.white,
            filter: `drop-shadow(0px 4px 5px ${new ColorTranslator(Colors.dark).setA(0.14).RGBA})`,
            marginLeft: 5,
        },
        inputInput: {
            padding: theme.spacing(0.7, 1, 0.7, 1),
            // vertical padding + font size from searchIcon
            transition: theme.transitions.create('width'),
            width: '100%',
            fontSize: 14,
            '&:focus': {
                color: Colors.black,
            },
            [theme.breakpoints.up('sm')]: {
                width: '18ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
        labelButton: {
            fontWeight: 'normal',
            fontSize: 14,
            lineHeight: '20px',
            color: Colors.whiteLight,
        },
        labelButtonLogout: {
            fontWeight: 'normal',
            fontSize: 14,
            lineHeight: '20px',
            transition: '.3s all',
        },
        actionBox: {
            display: 'flex',
            alignItems: 'center',
        },
        actionWrap: {
            position: 'relative',
        },
        contentHelper: {
            top: '49px !important',
        },
        contentHelperText: {
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 15,
            color: Colors.dark,
        },
        contentHelperTextLast: {
            left: '0 !important',
            transform: 'translateX(-24%) !important',
            minWidth: '116px !important',
        },
        contentArrow: {
            margin: 'auto',
            display: 'block',
            marginBottom: 10,
            height: 41,
        },
        actionDropdown: {
            width: '100%',
            position: 'absolute',
            background: Colors.white,
            paddingBottom: 9,
            borderRadius: 4,
            boxShadow: `0px 8px 10px ${new ColorTranslator(Colors.dark).setA(0.14).RGBA}, 0px 3px 14px ${
                new ColorTranslator(Colors.dark).setA(0.12).RGBA
            }, 0px 5px 5px ${new ColorTranslator(Colors.dark).setA(0.2).RGBA}`,
            transform: 'translateY(-4px)',
            display: 'none',
        },
        isOpenDropdown: {
            display: 'block',
        },
        isActive: {
            background: Colors.white,
            '&:hover': {
                background: Colors.white,
            },
        },
        menu: {
            paddingTop: 0,
            minWidth: 86,
            paddingBottom: 9,
        },
        menuPaper: {
            boxShadow: `0px 8px 10px ${new ColorTranslator(Colors.dark).setA(0.14).RGBA}, 0px 3px 14px ${
                new ColorTranslator(Colors.dark).setA(0.12).RGBA
            }, 0px 5px 5px ${new ColorTranslator(Colors.dark).setA(0.2).RGBA}`,
            borderRadius: 4,
            marginTop: -4,
        },
        menuItemlabelButton: {
            paddingLeft: 7,
        },
    }),
);

const ContentHelper = styled.div`
    position: absolute;
    top: 57px;
    left: 50%;
    min-width: 160px;
    width: 100%;
    transform: translateX(-50%);
`;

const Header: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLogin = useSelector(getLogin);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isOpenModal, setOpenModal] = useState(false);
    const [isShowDropdown, setShowDropdown] = useState(false);
    const [showUserName, setShowUserName] = useState('Login');
    const serverName = useSelector<string>(getServerName);
    const userName = useSelector<string>(getUserName);
    const screenMedium = useScreenMediaQuery('md');
    const screenSmall = useScreenMediaQuery('sm');
    const isIpad = screenMedium || screenSmall;

    const isModal = serverName !== '';

    const modalOpen = () => {
        if (isModal) {
            setOpenModal(true);
            dispatch(setLoginError(false));
        }
    };

    const logout = useCallback(() => {
        dispatch(Logout());
    }, []);

    useEffect(() => {
        const showUserName: any = isLogin && userName ? userName : 'Login';
        setShowUserName(showUserName);
    }, [userName, isLogin]);

    const modalClose = () => {
        setOpenModal(false);
    };

    const handleClose = useCallback((call?: any) => {
        setAnchorEl(null);
        setShowDropdown(false);

        if (typeof call === 'function') {
            call();
        }
    }, []);

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setShowDropdown(true);
    }, []);

    return (
        <>
            {isLogin && <Redirect to="/gallery" />}
            <AppBar color="primary" position="static" className={classes.header} key={'AppBar'}>
                <Container maxWidth="xl" className={classes.container}>
                    <Toolbar className={classes.toolBar}>
                        <Link to="/">
                            <Typography className={classes.link}>
                                <img src={Logo} alt="PDS | Serialized Asset Tokens" className={classes.logo} />
                            </Typography>
                        </Link>
                        <Typography variant="h1" className={classes.title} color="inherit" noWrap>
                            PDS | Serialized Asset Tokens
                        </Typography>
                    </Toolbar>
                    <Toolbar className={`${classes.toolBar} ${classes.toolBarAction}`}>
                        <IconButton edge="start" className={classes.colorBase} aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <div className={classes.search}>
                            <IconButton edge="start" className={classes.colorBase} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                placeholder="Search"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        <div className={classes.actionBox}>
                            <div className={classes.actionWrap}>
                                <ServerNameMenu />
                                {!isLogin && (
                                    <ContentHelper>
                                        <img src={ArrowTop} alt="ArrowTop" className={classes.contentArrow} />
                                        <Typography
                                            align="center"
                                            variant="subtitle2"
                                            className={classes.contentHelperText}
                                        >
                                            First, select your server
                                        </Typography>
                                    </ContentHelper>
                                )}
                            </div>
                            <IconButton className={classes.colorBase}>
                                <NotificationsIcon />
                            </IconButton>
                            <IconButton className={classes.colorBase}>
                                <SettingsIcon />
                            </IconButton>
                            <div className={classes.actionWrap}>
                                {isLogin && (
                                    <>
                                        <Button
                                            aria-controls="simple-menu-dropdown"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                            size="small"
                                            className={`${isShowDropdown ? classes.isActive : undefined}`}
                                            classes={{
                                                label: `${classes.colorDark} ${
                                                    isShowDropdown ? classes.labelButtonLogout : classes.labelButton
                                                }`,
                                            }}
                                        >
                                            {showUserName}
                                        </Button>
                                        <Menu
                                            id="simple-menu-dropdown"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            classes={{
                                                list: classes.menu,
                                                paper: classes.menuPaper,
                                            }}
                                            variant="menu"
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            getContentAnchorEl={null}
                                        >
                                            <MenuItem
                                                onClick={() => handleClose(logout())}
                                                className={`${classes.menuItemlabelButton} ${classes.labelButtonLogout}`}
                                            >
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </>
                                )}
                                {!isLogin && (
                                    <>
                                        <Button
                                            onClick={modalOpen}
                                            size="small"
                                            className={classes.colorBase}
                                            classes={{ label: classes.labelButton }}
                                        >
                                            {showUserName}
                                        </Button>
                                        <ContentHelper
                                            className={`${classes.contentHelper} ${
                                                isIpad ? classes.contentHelperTextLast : undefined
                                            }`}
                                        >
                                            <img src={ArrowTop} alt="ArrowTop" className={classes.contentArrow} />
                                            <Typography
                                                align="center"
                                                variant="subtitle2"
                                                className={`${classes.contentHelperText}`}
                                            >
                                                Then, click Login <br /> and sign on!
                                            </Typography>
                                        </ContentHelper>
                                    </>
                                )}
                            </div>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            {isModal && <ModalLogin modalClose={modalClose} isOpenModal={isOpenModal} key={'ModalLogin'} />}
        </>
    );
};

export default Header;
