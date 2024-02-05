import React, { ReactNode } from 'react'
import './styles/index.local.scss';

type Props = {
    children: ReactNode;
}

function H3(props: Props) {
    const { children, ...otherProps} = props;
    return <h3 {...otherProps}>{children}</h3>;
}

export default React.memo(H3);
