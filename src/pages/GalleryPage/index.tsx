import React, { FC, ChangeEvent, useState, lazy, Suspense, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Colors from '../../constants/Colors';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import { isSinglePage, tileData, getLoadTileData, setSinglePage } from '../../store/gallerySlice';

import ImagesPage from '../../pages/ImagesPage';
import Typography from '@material-ui/core/Typography';
import { setDownloadFile } from '../../store/downloadSlice';
const SinglePage = lazy(() => import('../../pages/SinglePage'));

const useStyles = makeStyles(() =>
    createStyles({
        title: {
            fontWeight: 'bold',
            textAlign: 'center',
        },
        action: {
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: '1.25px',
            textTransform: 'uppercase',
            boxShadow: '0 0 0',
            '&~ *': {
                marginLeft: 19,
            },
        },
        actionOutlined: {
            color: Colors.primary,
        },
        toolbarAction: {
            display: 'flex',
            justifyContent: 'center',
            minHeight: 55,
            marginBottom: 19,
        },
        formControl: {
            width: 304,
        },
        formSelect: {
            '&:before': {
                borderColor: `${Colors.transparent}!important`,
            },
            '&:after': {
                borderColor: `${Colors.transparent}!important`,
            },
        },
        select: {
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 20,
            lineHeight: '24px',
            background: `${Colors.white}!important`,
        },
        selectIcon: {
            display: 'none',
        },
        section: {},
        load: {
            filter: 'blur(4px)',
            pointerEvents: 'none',
        },
        loadProgress: {
            position: 'absolute',
            left: 'calc(50% - 48px)',
            top: 'calc(50% - 48px)',
            zIndex: 1,
        },
        notAvailable: {
            fontWeight: 600,
        },
    }),
);

const Border = styled.div`
    position: relative;
    margin-left: 19px;
    margin-bottom: 42px;
    &:after {
        content: '';
        background: rgba(33, 33, 33, 0.08);
        position: absolute;
        left: -19px;
        top: 100%;
        height: 1px;
        width: 100%;
        margin-top: 5px;
    }
`;

const GalleryPage: FC = () => {
    const tile = useSelector(tileData);
    const isLoadTileData = useSelector(getLoadTileData);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [album, setAlbum] = useState<string>('MyPersonalAlbum');
    const [isTile, seIsTile] = useState<boolean>(true);
    const isSingle = useSelector(isSinglePage);
    const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
        setAlbum(event.target.value as string);
    };
    useEffect(() => {
        const isTile: boolean = !isLoadTileData && tile.length > 0;
        seIsTile(isTile);
    }, [isLoadTileData]);

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
        <section className={classes.section}>
            {isLoadTileData && <CircularProgress className={classes.loadProgress} />}
            {!isLoadTileData && isTile && (
                <div className={`${isLoadTileData ? classes.load : undefined}`}>
                    <Toolbar className={classes.toolbarAction}>
                        <Button onClick={gotToBack} variant="contained" color="primary" className={classes.action}>
                            GALLERY
                        </Button>
                        <Button variant="outlined" className={`${classes.action} ${classes.actionOutlined}`}>
                            CREATE
                        </Button>
                    </Toolbar>
                    <Toolbar>
                        <Border>
                            <FormControl className={classes.formControl}>
                                <Select
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={album}
                                    onChange={handleChange}
                                    className={classes.formSelect}
                                    classes={{
                                        select: classes.select,
                                        icon: classes.selectIcon,
                                    }}
                                >
                                    <MenuItem value="MyPersonalAlbum">My Personal Album</MenuItem>
                                    <MenuItem value="MyPersonalAlbum1">My Personal Album 1</MenuItem>
                                    <MenuItem value="MyPersonalAlbum2">My Personal Album 2</MenuItem>
                                </Select>
                            </FormControl>
                        </Border>
                    </Toolbar>
                    <Suspense fallback={<div>Loading...</div>}>
                        {!isSingle && <ImagesPage />}
                        {isSingle && <SinglePage />}
                    </Suspense>
                </div>
            )}
            {!isLoadTileData && !isTile && (
                <Typography
                    variant="subtitle1"
                    align="center"
                    className={`${classes.notAvailable} ${classes.loadProgress}`}
                >
                    N/A (not available)
                </Typography>
            )}
        </section>
    );
};

export default GalleryPage;
