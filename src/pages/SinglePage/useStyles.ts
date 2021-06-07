import { createStyles, makeStyles } from '@material-ui/core/styles';
import Colors, { ColorTranslator } from '../../constants/Colors';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            marginTop: 40,
        },
        title: {
            fontWeight: 'normal',
            fontSize: 34,
            lineHeight: '36px',
            color: new ColorTranslator(Colors.dark).setA(0.87).RGBA,
            marginBottom: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        titleSmall: {
            fontWeight: 'normal',
            fontSize: 20,
            lineHeight: '24px',
            letterSpacing: '0.15px',
            color: new ColorTranslator(Colors.dark).setA(0.87).RGBA,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        subtitle: {
            fontWeight: 'normal',
            fontSize: 14,
            lineHeight: '20px',
            letterSpacing: '0.25px',
            color: new ColorTranslator(Colors.dark).setA(0.6).RGBA,
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        listItem: {
            '&:not(:last-child)': {
                marginBottom: 6,
            },
        },
        listItemWrap: {
            width: 'inherit',
        },
        checkbox: {
            marginLeft: -42,
            marginTop: -10,
        },
        iconButton: {
            marginLeft: -30,
            marginTop: -4,
            position: 'relative',
            left: -6,
        },
        collapseAsset: {
            marginLeft: 27,
        },
        collapseProgress: {
            marginTop: 15,
        },
        squareBadgeCertifications: {
            minWidth: 131,
            maxWidth: 300,
        },
        squareBadgeRoyalties: {
            minWidth: 183,
        },
        hidden: {
            overflow: 'hidden',
        },
        notAvailable: {
            marginTop: 14,
        },
    }),
);

export default useStyles;
