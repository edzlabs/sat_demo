import React, { FC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { getRoyaltiesSingleData } from '../../store/royaltiesSlice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SquareBadge from '../../components/Badge/SquareBadge';
import Colors from '../../constants/Colors';
import itemExpandTree from '../../assets/images/itemExpandTree.png';

const useStyles = makeStyles(() =>
    createStyles({
        squareBadgeRoyalties: {
            minWidth: 183,
            display: 'inline-block',
            zIndex: 1,
            position: 'relative',
        },
        listTree: {
            margin: 0,
            padding: 0,
            position: 'relative',
            '&:first-child': {
                marginTop: 30,
            },
        },
        listTreeGroup: {
            marginLeft: 45,
        },
        itemTreeFirst: {
            '&:before': {
                display: 'none !important',
            },
        },
        /**
         * TODO: кастыль для роялти
         */
        noArrow: {
            '&:before': {
                display: 'none !important',
            },
        },
    }),
);

const ListTree = styled.ul`
    &:before {
        content: '';
        display: block;
        width: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 16px;
        border-left: 1px solid ${Colors.dark};
    }
`;

const ItemTree = styled.li`
    list-style-type: none;
    margin-top: 20px;
    position: relative;
    &:before {
        content: '';
        display: block;
        width: 29px;
        height: 9px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url(${itemExpandTree});
        position: absolute;
        top: 13px;
        left: -29px;
    }

    &:last-child:after {
        content: '';
        background: ${Colors.white};
        left: -33px;
        top: 18px;
        bottom: 0;
        width: 16px;
        height: 110%;
        position: absolute;
    }
`;

const AssetTree: FC = () => {
    const classes = useStyles();
    const {
        tagId,
        tagIdPercent,
        dabIdParams,
    }: { tagId: number; tagIdPercent: string; dabIdParams: string[] } = useSelector(getRoyaltiesSingleData);
    return (
        <ListTree className={classes.listTree}>
            <ItemTree className={classes.itemTreeFirst}>
                <SquareBadge className={classes.squareBadgeRoyalties}>
                    SAT {tagId} ({tagIdPercent}%)
                </SquareBadge>
                <ListTree className={`${classes.listTree} ${classes.listTreeGroup} ${classes.noArrow}`}>
                    {dabIdParams &&
                        dabIdParams.map((el: any) => (
                            <ItemTree key={el}>
                                <SquareBadge className={classes.squareBadgeRoyalties}>
                                    DAB {el.dabId} ({el.dabIdPercent}%)
                                </SquareBadge>
                            </ItemTree>
                        ))}
                    {/*<ItemTree>*/}
                    {/*    <SquareBadge className={classes.squareBadgeRoyalties}>Digital asset badge 2</SquareBadge>*/}
                    {/*    <ListTree className={`${classes.listTree} ${classes.listTreeGroup}`}>*/}
                    {/*        <ItemTree>*/}
                    {/*            <SquareBadge className={classes.squareBadgeRoyalties}>CERTIFICATION 2</SquareBadge>*/}
                    {/*            <ListTree className={`${classes.listTree} ${classes.listTreeGroup}`}>*/}
                    {/*                <ItemTree>*/}
                    {/*                    <SquareBadge className={classes.squareBadgeRoyalties}>SUBTAG 2</SquareBadge>*/}
                    {/*                </ItemTree>*/}
                    {/*            </ListTree>*/}
                    {/*        </ItemTree>*/}
                    {/*    </ListTree>*/}
                    {/*</ItemTree>*/}
                </ListTree>
            </ItemTree>
        </ListTree>
    );
};

export default AssetTree;
