import React, { FC } from 'react';
import dayjs from 'dayjs';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { singleTileData } from '../../store/gallerySlice';
import useStyles from './useStyles';

interface StateProps {
    description: string;
    dataHash: string;
    createdAt: string;
    licenseType: string;
    assetId: number;
}

const typedUseSelector: TypedUseSelectorHook<StateProps> = useSelector;

const Metadata: FC = () => {
    const classes = useStyles();
    const { description, assetId, dataHash, createdAt, licenseType } = typedUseSelector(singleTileData);

    const DateTime = (): string => {
        return dayjs(createdAt).format('MM/DD/YYYY');
    };

    return (
        <List className={classes.root}>
            <ListItem alignItems="flex-start" className={classes.listItem}>
                <div className={classes.listItemWrap}>
                    <Typography variant="h1" className={classes.title} color="textPrimary">
                        Asset Details
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle} color="textPrimary">
                        For {description}
                    </Typography>
                </div>
            </ListItem>
            <ListItem alignItems="flex-start" className={classes.listItem}>
                <div className={classes.listItemWrap}>
                    <Typography variant="h3" className={classes.titleSmall} color="textPrimary">
                        {assetId}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle} color="textPrimary">
                        [ASSET ID]
                    </Typography>
                </div>
            </ListItem>
            <ListItem alignItems="flex-start" className={classes.listItem}>
                <div>
                    <Typography variant="h3" className={classes.titleSmall} color="textPrimary">
                        {licenseType}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle} color="textPrimary">
                        [LICENSE TYPE?]
                    </Typography>
                </div>
            </ListItem>
            <ListItem alignItems="flex-start" className={classes.listItem}>
                <div>
                    <Typography variant="h3" className={classes.titleSmall} color="textPrimary">
                        {DateTime()}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle} color="textPrimary">
                        [DATE OF LICENSE APPLICATION]
                    </Typography>
                </div>
            </ListItem>
            <ListItem alignItems="flex-start" className={classes.listItem}>
                <div>
                    <Typography variant="h3" className={classes.titleSmall} color="textPrimary">
                        {dataHash}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle} color="textPrimary">
                        [ASSET DATA HASH]
                    </Typography>
                </div>
            </ListItem>
        </List>
    );
};

export default Metadata;
