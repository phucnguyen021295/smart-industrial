import React, { ReactNode } from 'react'
import './styles/index.local.scss';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    testId?: string;
}

function H5(props: Props) {
    const { children, ...otherProps} = props;
    return <h5 {...otherProps}>{children}</h5>;
}

export default React.memo(H5);
