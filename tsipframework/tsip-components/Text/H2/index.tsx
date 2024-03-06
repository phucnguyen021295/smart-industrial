import React, { ReactNode } from 'react'
import './styles/index.local.scss';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    testId?: string;
}

function H2(props: Props) {
    const { children, ...otherProps} = props;
    return <h2 {...otherProps}>{children}</h2>;
}

export default React.memo(H2);
