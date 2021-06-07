import React, { FC, useCallback } from 'react';
import { createStyles, makeStyles, styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import WhiteButton from '../../components/Button/WhiteButton';
import AddIcon from '@material-ui/icons/Add';
import ColoredScrollbarsColor from '../../components/ColoredScrollbars';
import { tileData, setSinglePage, setSinglePageTagId } from '../../store/gallerySlice';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Colors, { ColorTranslator } from '../../constants/Colors';
import FocusButtonBase from './FocusButtonBase';
import { useScreenMediaQuery } from '../../utils/MediaQuery';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
        },
        section: {
            position: 'relative',
        },
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
        icon: {
            color: new ColorTranslator(Colors.black).setA(0.87).RGBA,
            cursor: 'pointer',
        },
        toolbarLast: {
            marginTop: 30,
        },
        img: {
            left: '50%',
            position: 'relative',
            transform: 'translateX(-50%)',
            display: 'inline-block',
            width: '100%',
        },
        imgResponsive: {
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            margin: 'auto',
        },
        gridListTileBar: {
            background: Colors.white,
            bottom: 50,
        },
        gridListTileBarExtraSmall: {
            paddingLeft: 30,
            paddingRight: 30,
        },
        muiGridListTileBarTitle: {
            color: new ColorTranslator(Colors.black).setA(0.87).RGBA,
            fontWeight: 'normal',
            fontSize: 14,
            lineHeight: '24px',
        },
        muiGridListTileBarTitleWrap: {
            marginLeft: 0,
        },
    }),
);

const AddButton = styled(WhiteButton)({
    borderRadius: 23,
    marginLeft: 'auto',
    padding: '12px 25px',
});

type ListItemsProps = {
    img: string;
    description: string;
    assetId: number;
    tagId: number;
};

const ImagesPage: FC = () => {
    const tile = useSelector(tileData);
    const dispatch = useDispatch();
    const classes = useStyles();

    const isTile = tile.length;

    const screenExtraLarge = useScreenMediaQuery('xl');
    const screenLarge = useScreenMediaQuery('lg');
    const screenMedium = useScreenMediaQuery('md');
    const screenSmall = useScreenMediaQuery('sm');
    const screenExtraSmall = useScreenMediaQuery('xs');
    const screenNarrow = useMediaQuery('(max-width:340px)');

    const getScreenWidth = () => {
        if (screenExtraLarge) {
            return 4;
        } else if (screenNarrow) {
            return 2;
        } else if (screenLarge) {
            return 4;
        } else if (screenMedium) {
            return 2;
        } else if (screenSmall) {
            return 2;
        } else if (screenExtraSmall) {
            return 1;
        } else {
            return 3;
        }
    };

    /**
     * pass the parameter to go to a single page of the assetId image = dabId
     * @param assetId
     * @param tagId
     */
    const handleDoubleClick = useCallback((assetId: number, tagId: any): void => {
        dispatch(setSinglePage(assetId));
        dispatch(setSinglePageTagId(tagId));
    }, []);

    return (
        <section>
            <ColoredScrollbarsColor style={{ height: isTile ? 761 : 0 }}>
                <Toolbar>
                    <div className={classes.root}>
                        <GridList cellHeight={400} cols={getScreenWidth()} spacing={18}>
                            {isTile &&
                                tile.map((tile: ListItemsProps) => (
                                    <GridListTile key={tile.assetId}>
                                        <FocusButtonBase
                                            onDoubleClick={() => handleDoubleClick(tile.assetId, tile.tagId)}
                                        >
                                            <img
                                                src={tile.img}
                                                alt={tile.description}
                                                className={classes.imgResponsive}
                                            />
                                        </FocusButtonBase>

                                        <GridListTileBar
                                            title={tile.description}
                                            className={`${classes.gridListTileBar} ${
                                                screenMedium ? classes.gridListTileBarExtraSmall : undefined
                                            }`}
                                            classes={{
                                                title: classes.muiGridListTileBarTitle,
                                                titleWrap: classes.muiGridListTileBarTitleWrap,
                                            }}
                                            actionIcon={
                                                <FavoriteBorderIcon
                                                    aria-label={`info about ${tile.description}`}
                                                    className={classes.icon}
                                                />
                                            }
                                        />
                                    </GridListTile>
                                ))}
                        </GridList>
                    </div>
                </Toolbar>
            </ColoredScrollbarsColor>
            <Toolbar className={classes.toolbarLast}>
                <AddButton variant="contained" startIcon={<AddIcon />}>
                    NEW
                </AddButton>
            </Toolbar>
        </section>
    );
};

export default ImagesPage;
