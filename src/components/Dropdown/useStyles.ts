import { createStyles, makeStyles } from '@material-ui/core/styles';
import Colors, { ColorTranslator } from '../../constants/Colors';

const useStyles = makeStyles(() =>
    createStyles({
        root: {},
        rootButton: {
            // background: new ColorTranslator(Colors.dark).setA(0.04).RGBA,
        },
        label: {
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 14,
            lineHeight: '27px',
            justifyContent: 'space-between',
            letterSpacing: '0.25px',
        },
        wrap: {
            paddingLeft: 4,
            minWidth: 128,
            border: 0,
            paddingTop: 0,
            paddingBottom: 0,
        },
        menu: {
            paddingTop: 0,
            minWidth: 128,
            paddingBottom: 9,
        },
        menuPaper: {
            boxShadow: `0px 8px 10px ${new ColorTranslator(Colors.dark).setA(0.14).RGBA}, 0px 3px 14px ${
                new ColorTranslator(Colors.dark).setA(0.12).RGBA
            }, 0px 5px 5px ${new ColorTranslator(Colors.dark).setA(0.2).RGBA}`,
            borderRadius: 4,
            marginTop: -4,
        },
        menuItemFirst: {
            paddingTop: 15,
            paddingBottom: 15,
            background: new ColorTranslator(Colors.dark).setA(0.04).RGBA,
            '&:hover': {
                background: new ColorTranslator(Colors.dark).setA(0.04).RGBA + '!important',
            },
        },
        menuItem: {
            paddingLeft: 4,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 14,
            lineHeight: '20px',
            letterSpacing: '0.25px',
            color: Colors.black,
            '&:hover': {
                background: Colors.white,
            },
        },
        icon: {
            fontSize: '1.5rem !important',
        },
        menuItemIcon: {
            right: 8,
            position: 'absolute',
        },
        endIcon: {
            position: 'absolute',
            right: 13,
        },
    }),
);

export default useStyles;
