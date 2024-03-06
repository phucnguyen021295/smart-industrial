import React, { ReactNode } from 'react'
import './styles/index.local.scss';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    testId?: string;
}

function H6 (props: Props) {
    const { children, ...otherProps} = props;
    return <h6 {...otherProps}>{children}</h6>;
}

export default React.memo(H6);
