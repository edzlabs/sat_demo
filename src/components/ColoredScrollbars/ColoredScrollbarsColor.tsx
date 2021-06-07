import Colors from '../../constants/Colors';
import styled from 'styled-components';
import { ColorTranslator } from 'colortranslator';

const hex = new ColorTranslator(Colors.black).setA(0.38).RGBA;

const ColoredScrollbarsColor = styled.div`
    background: ${hex};
    border-radius: 2px;
`;

export default ColoredScrollbarsColor;
