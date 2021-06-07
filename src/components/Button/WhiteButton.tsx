import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Colors, { ColorTranslator } from '../../constants/Colors';

const WhiteButton = styled(Button)({
    background: Colors.white,
    '&:hover': {
        backgroundColor: `${new ColorTranslator(Colors.dark).setA(0.04).RGBA}`,
    },
});

export default WhiteButton;
