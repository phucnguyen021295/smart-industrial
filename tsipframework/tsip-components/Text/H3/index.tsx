import React, { ReactNode } from 'react'
import './styles/index.local.scss';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    testId?: string;
}

function H3(props: Props) {
    const { children, ...otherProps} = props;
    return <h3 {...otherProps}>{children}</h3>;
}

export default React.memo(H3);
