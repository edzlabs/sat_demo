import React, { FC, useState, lazy, Suspense, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Colors, { ColorTranslator } from '../../constants/Colors';
import BackIcon from './BackIcon';
import { setSinglePage, singleTileData, getServerName, getUserParams } from '../../store/gallerySlice';
import { DownloadContentAsync, getDownloadFile, setDownloadFile } from '../../store/downloadSlice';
import { LicensePropsMetadata } from '../../services/api/Assets';
import ModalComponent from '../../components/ModalComponent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useScreenMediaQuery } from '../../utils/MediaQuery';

import Asset from './Asset';
const Metadata = lazy(() => import('./Metadata'));

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom: 15,
        },
        gridContainer: {
            paddingLeft: 137,
            paddingRight: 137,
            position: 'relative',
        },
        gridContainerScreenMedium: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        rootCard: {
            maxWidth: 345,
        },
        rootCardScreenSmall: {
            maxWidth: '100%',
        },
        card: {
            border: 0,
            boxShadow: '0 0 0',
        },
        cardTitle: {
            fontWeight: 'normal',
            fontSize: 14,
            lineHeight: '24px',
            letterSpacing: '0.15px',
            maxWidth: '90%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        cardIcon: {
            color: new ColorTranslator(Colors.black).setA(0.87).RGBA,
            cursor: 'pointer',
            marginLeft: 'auto',
        },
        cardActionsRoot: {
            padding: 0,
            marginTop: 55,
        },
        cardMedia: {
            height: 313,
            '@media(max-width: 800px)': {
                backgroundSize: 'auto',
            },
        },
        toolbarAction: {
            marginTop: 40,
            display: 'flex',
            justifyContent: 'center',
        },
        actionOutlined: {
            color: Colors.primary,
        },
        action: {
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: '1.25px',
            textTransform: 'uppercase',
            boxShadow: '0 0 0',
            minWidth: 95,
            '&~ *': {
                marginLeft: 19,
            },
        },
        backButton: {
            marginTop: 20,
            position: 'absolute',
            left: 28,
        },
        backButtonLabel: {
            fontStyle: 'italic',
            fontWeight: 'normal',
            fontSize: 18,
            lineHeight: '20px',
            letterSpacing: '0.25px',
            textDecorationLine: 'underline',
            color: Colors.grey1,
            '&:hover': {
                textDecorationLine: 'underline',
            },
        },
        backButtonStartIcon: {
            marginRight: 14,
        },
        imgResponsive: {
            maxWidth: '85vw',
            '& > video': {
                height: '95vh !important',
                width: '100% !important',
                background: Colors.dark,
                '@media(max-width: 1100px)': {
                    width: 'auto !important',
                    maxWidth: '100%',
                },
            },

            '& > div': {
                display: 'flex',
                alignItems: 'center',
            },
            '& img': {
                height: '95vh',
                border: 0,
                background: Colors.greyBlueLight,
                maxWidth: '100%',
                '@media(max-width: 1100px)': {
                    height: 'auto',
                },
            },
        },
        modalPaper: {
            background: 'transparent',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
        },
        modalProgress: {
            position: 'absolute',
            left: '46%',
            top: '50%',
            color: Colors.white,
        },
    }),
);

interface StateProps extends LicensePropsMetadata {
    title: string;
    description: string;
    assetId: number;
}

const typedUseSelector: TypedUseSelectorHook<StateProps> = useSelector;
const typedUseParams: TypedUseSelectorHook<{
    prvKey: string;
    pubKey: string;
}> = useSelector;

const SinglePage: FC = () => {
    const classes = useStyles();
    const [isOpenModal, setOpenModal] = useState(false);
    const { img, description, buyerId, tagId, dabId } = typedUseSelector(singleTileData);
    const downloadFile: string = useSelector(getDownloadFile);
    const serverName: string = useSelector(getServerName);
    const { prvKey, pubKey } = typedUseParams(getUserParams);
    const dispatch = useDispatch();
    const [page, setPage] = useState<string>('assets');
    const changePage = (page: string): void => {
        setPage(page);
    };

    const useScreenMedium = useScreenMediaQuery('md');
    const screenSmall = useScreenMediaQuery('sm');

    const modalOpen = () => {
        setOpenModal(true);
    };

    const modalClose = () => {
        setOpenModal(false);
        const video: HTMLScriptElement[] | any = document.querySelector('#dsd-content-player-container video');

        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    };

    // const script: HTMLScriptElement[] | any = document.querySelector('#dsd-content-player');
    const head: HTMLScriptElement[] | any = document.querySelector('head');

    async function downloadContent() {
        if (!downloadFile.length) {
            await dispatch(DownloadContentAsync({ prvKey, pubKey, assetId: tagId, dabId, serverName, buyerId }));
        }

        if (downloadFile) {
            const script: HTMLScriptElement[] | any = document.querySelector('#dsd-content-player');
            if (!script) {
                const script = document.createElement('script');
                script.id = 'dsd-content-player';
                script.type = 'text/javascript';
                script.async = true;
                script.src = downloadFile;
                head.appendChild(script);
            }
        }
    }

    useEffect(() => {
        const script: HTMLScriptElement[] | any = document.querySelector('#dsd-content-player');
        script && script.remove();
    }, []);

    useEffect(() => {
        isOpenModal && downloadContent();
    }, [isOpenModal, downloadFile]);

    /**
     * return back to the page with the gallery
     */
    const gotToBack = () => {
        dispatch(setSinglePage(''));
        dispatch(setDownloadFile(''));
        const script: HTMLScriptElement[] | any = document.querySelector('#dsd-content-player');
        script && script.remove();
    };
    return (
        <div className={classes.root}>
            <ModalComponent
                isOpen={isOpenModal}
                handleClose={modalClose}
                isKeepMounted
                classNamePaper={classes.modalPaper}
            >
                <div id="dsd-content-player-container" className={classes.imgResponsive}>
                    <CircularProgress className={classes.modalProgress} />
                </div>
            </ModalComponent>
            <Grid
                container
                spacing={2}
                className={`${classes.gridContainer} ${
                    useScreenMedium || screenSmall ? classes.gridContainerScreenMedium : undefined
                }`}
            >
                <Grid item xs={12} md={5}>
                    <div className={`${classes.rootCard} ${screenSmall ? classes.rootCardScreenSmall : undefined}`}>
                        <Card className={classes.card}>
                            <CardActionArea onClick={modalOpen}>
                                <CardMedia className={classes.cardMedia} image={img} title={description} />
                            </CardActionArea>
                            <CardActions disableSpacing classes={{ root: classes.cardActionsRoot }}>
                                <Typography variant="subtitle1" className={classes.cardTitle}>
                                    {description}
                                </Typography>
                                <FavoriteBorderIcon className={classes.cardIcon} />
                            </CardActions>
                        </Card>
                        <Toolbar className={classes.toolbarAction}>
                            <Button
                                variant={page === 'assets' ? 'contained' : 'outlined'}
                                className={`${classes.action} ${
                                    page !== 'assets' ? classes.actionOutlined : 'MuiButton-containedPrimary'
                                }`}
                                onClick={() => changePage('assets')}
                            >
                                ASSET
                            </Button>
                            <Button
                                variant={page === 'metadata' ? 'contained' : 'outlined'}
                                className={`${classes.action} ${
                                    page !== 'metadata' ? classes.actionOutlined : 'MuiButton-containedPrimary'
                                }`}
                                onClick={() => changePage('metadata')}
                            >
                                METADATA
                            </Button>
                        </Toolbar>
                    </div>
                    <Button
                        className={classes.backButton}
                        classes={{ label: classes.backButtonLabel, startIcon: classes.backButtonStartIcon }}
                        startIcon={<BackIcon />}
                        onClick={gotToBack}
                    >
                        Back to Gallery
                    </Button>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Suspense fallback={<div>Loading...</div>}>
                        {page === 'assets' && <Asset />}
                        {page === 'metadata' && <Metadata />}
                    </Suspense>
                </Grid>
            </Grid>
        </div>
    );
};

export default SinglePage;
