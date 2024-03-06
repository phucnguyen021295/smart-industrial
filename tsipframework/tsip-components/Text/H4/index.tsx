import React, { ReactNode } from 'react'
import './styles/index.local.scss';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    testId?: string;
}

function H4(props: Props) {
    const { children, ...otherProps} = props;
    return <h4 {...otherProps}>{children}</h4>;
}

export default React.memo(H4);
