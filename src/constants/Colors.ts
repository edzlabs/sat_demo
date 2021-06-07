import blue from '@material-ui/core/colors/blue';
import { ColorTranslator } from 'colortranslator';

export { ColorTranslator };

export default {
    primary: '#225179',
    white: '#ffffff',
    whiteLight: new ColorTranslator('#ffffff').setA(0.7).RGBA,
    black: '#212121',
    dark: '#000000',
    grey1: '#333333',
    blackLight: new ColorTranslator('#212121').setA(0.08).RGBA,
    greyBlueLight: '#c6d2dc',
    transparent: 'transparent',
    blue: blue[600],
};
