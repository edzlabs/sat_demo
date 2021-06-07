import React, { FC, useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { singleTileData, getServerName, getUserParams, singlePage } from '../../store/gallerySlice';
import { CertificationsAsync, getCertificationsData, TypeCertifications } from '../../store/certificationsSlice';
import { RoyaltiesAsync } from '../../store/royaltiesSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import ButtonSingle from './ButtonSingle';
import SquareBadge from '../../components/Badge/SquareBadge';
import styled from 'styled-components';
import AssetTree from './AssetTree';
import LeosConverter from '../../utils/LeosConverter';

interface StateProps {
    description: string;
    ownerId: string;
    dealRevokeValue: string;
}

const typedUseSelector: TypedUseSelectorHook<StateProps> = useSelector;

const FlexRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px -10px -20px;
`;

const FlexCol = styled.div`
    position: relative;
    padding-right: 10px;
    padding-left: 10px;
    margin-bottom: 20px;
`;

const Asset: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isCertifications, setCertifications] = useState<boolean>(false);
    const [valuePrice, setValuePrice] = useState<any>('');
    const [isRoyalties, setRoyalties] = useState<boolean>(false);
    const [isLoadCertifications, setLoadCertifications] = useState<boolean>(false);
    const [isLoadRoyalties, setLoadRoyalties] = useState<boolean>(false);
    const certifications: TypeCertifications = useSelector(getCertificationsData);
    const serverName: any = useSelector<string>(getServerName);
    const userParams = useSelector<{ userId: string }>(getUserParams);
    const dabId: any = useSelector<string | number>(singlePage);
    const { description, ownerId, dealRevokeValue, licenseType, tagId } = typedUseSelector(singleTileData);
    useEffect(() => {
        const value = LeosConverter(dealRevokeValue);
        setValuePrice(value);
    }, []);
    const onChangeCertifications = async (isCheckbox: boolean) => {
        setCertifications(isCheckbox);

        if (isCheckbox) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { userId } = userParams;
            setLoadCertifications(true);
            await dispatch(CertificationsAsync({ userId, serverName, dabId }));
            setLoadCertifications(false);
        }
    };
    const onChangeRoyalties = async (isCheckbox: boolean) => {
        setRoyalties(isCheckbox);
        if (isCheckbox) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { userId } = userParams;
            setLoadRoyalties(true);
            await dispatch(RoyaltiesAsync({ userId, serverName, tagId, licenseType }));
            setLoadRoyalties(false);
        }
    };
    const onClickCertifications = () => {
        onChangeCertifications(!isCertifications);
    };
    const onClickRoyalties = () => {
        onChangeRoyalties(!isRoyalties);
    };

    const isCertificationsData = certifications.length > 0;

    return (
        <List className={classes.root}>
            <ListItem alignItems="flex-start" className={classes.listItem}>
                <div className={classes.listItemWrap}>
                    <Typography variant="h1" className={classes.title} color="textPrimary">
                        {description}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle} color="textPrimary">
                        [Description]
                    </Typography>
                </div>
            </ListItem>
            <ListItem alignItems="flex-start" className={classes.listItem}>
                <div className={classes.listItemWrap}>
                    <Typography variant="h3" className={classes.titleSmall} color="textPrimary">
                        {ownerId}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle} color="textPrimary">
                        [OWNER]
                    </Typography>
                </div>
            </ListItem>
            <ListItem alignItems="flex-start" className={classes.listItem}>
                <div>
                    <Typography variant="h3" className={classes.titleSmall} color="textPrimary">
                        {valuePrice}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle} color="textPrimary">
                        [VALUE]
                    </Typography>
                </div>
            </ListItem>
            <ListItem alignItems="flex-start" className={classes.listItem}>
                <div onClick={onClickCertifications}>
                    <ButtonSingle isCheckbox={isCertifications} />
                </div>
                <div className={classes.hidden}>
                    <Typography
                        variant="h3"
                        className={classes.titleSmall}
                        color="textPrimary"
                        onClick={onClickCertifications}
                    >
                        Certifications
                    </Typography>
                    <Collapse in={isCertifications} component={'div'} className={classes.collapseAsset}>
                        {isLoadCertifications ? (
                            <>
                                <CircularProgress className={classes.collapseProgress} />
                            </>
                        ) : isCertificationsData ? (
                            <FlexRow>
                                {certifications.map((elem: string, index) => (
                                    <FlexCol key={index.toString()}>
                                        <SquareBadge className={classes.squareBadgeCertifications}>{elem}</SquareBadge>
                                    </FlexCol>
                                ))}
                            </FlexRow>
                        ) : (
                            <Typography variant="subtitle2" className={classes.notAvailable}>
                                N/A (not available)
                            </Typography>
                        )}
                    </Collapse>
                </div>
            </ListItem>
            <ListItem alignItems="flex-start" className={classes.listItem}>
                <div onClick={onClickRoyalties}>
                    <ButtonSingle isCheckbox={isRoyalties} />
                </div>
                <div className={classes.hidden}>
                    <Typography
                        variant="h3"
                        className={classes.titleSmall}
                        color="textPrimary"
                        onClick={onClickRoyalties}
                    >
                        Royalties
                    </Typography>
                    <Collapse in={isRoyalties} component={'div'} className={classes.collapseAsset}>
                        {isLoadRoyalties ? (
                            <>
                                <CircularProgress className={classes.collapseProgress} />
                            </>
                        ) : (
                            <AssetTree />
                        )}
                    </Collapse>
                </div>
            </ListItem>
        </List>
    );
};

export default Asset;
