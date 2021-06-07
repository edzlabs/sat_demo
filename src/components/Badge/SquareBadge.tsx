import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Colors';

type Props = {
    children: ReactNode;
    color?: string;
    className?: string;
};
type StyleProps = {
    color?: 'primary';
};

const defaultProps = {
    color: 'primary',
};

const Badge = styled.div<StyleProps>`
    color: ${Colors.white};
    background-color: ${Colors.primary};
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 1.25px;
    padding: 10px 15px;
    border-radius: 4px;
    text-transform: uppercase;
`;

const SquareBadge = ({ children, className }: Props): JSX.Element => {
    return <Badge className={className}>{children}</Badge>;
};

SquareBadge.defaultProps = defaultProps;

export default SquareBadge;
