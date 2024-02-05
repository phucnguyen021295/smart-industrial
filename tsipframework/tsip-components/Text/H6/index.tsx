import React, { ReactNode } from 'react'
import './styles/index.local.scss';

type Props = {
    children: ReactNode;
}

function H6 (props: Props) {
    const { children, ...otherProps} = props;
    return <h6 {...otherProps}>{children}</h6>;
}

export default React.memo(H6);
