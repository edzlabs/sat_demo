import WebFont from 'webfontloader';

/**
 * font-family: 'Roboto', sans-serif;
 */

const config: WebFont.Config = {
    google: {
        families: [
            'Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900',
            'sans-serif',
        ],
    },
};

WebFont.load(config);
