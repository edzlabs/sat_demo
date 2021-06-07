import { createGlobalStyle } from 'styled-components';
import Colors from './constants/Colors';

const GlobalStyle = createGlobalStyle`
    body {
        overflow-x: hidden;
        margin: 0;
        padding: 0;
        background: ${Colors.white};
        color: ${Colors.black};
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        font-size: 14px;
        line-height: 1.2;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;

export default GlobalStyle;
