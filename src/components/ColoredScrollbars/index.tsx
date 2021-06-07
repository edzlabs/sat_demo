import React, { ReactNode } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import ColoredScrollbarsColor from './ColoredScrollbarsColor';

type ScrollbarsProps = {
    style?: any;
    children?: ReactNode;
};

const ColoredScrollbars = (props: ScrollbarsProps): JSX.Element => {
    return (
        <Scrollbars
            autoHeightMin={509}
            // autoHeightMax="calc(80vh - 36px - 35px - 75px)"
            renderThumbVertical={(props) => <ColoredScrollbarsColor {...props} />}
            {...props}
        />
    );
};

export default ColoredScrollbars;
