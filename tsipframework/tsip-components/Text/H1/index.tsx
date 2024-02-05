import React, { ReactNode } from 'react'
import './styles/index.local.scss';

type Props = {
    children: ReactNode;
}

function H1(props: Props) {
    const { children, ...otherProps} = props;
    return <h1 {...otherProps}>{children}</h1>;
}

export default React.memo(H1);
