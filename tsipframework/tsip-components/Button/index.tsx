'use client'

import React from 'react';
import {ButtonProps, Button, ConfigProvider} from 'antd';

// Styles
import themeConfig from './themeConfig';
import './index.local.scss';

interface Props extends ButtonProps {
    children: React.ReactNode
};

export default function ButtonBase(props: Props) {
    const {children, ...otherProps} = props;

    return (
        <ConfigProvider theme={themeConfig}>
            <Button {...otherProps}>{children}</Button>
        </ConfigProvider>    
    );
}