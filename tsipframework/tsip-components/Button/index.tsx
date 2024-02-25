'use client'

import React from 'react';
import {ButtonProps, Button, ConfigProvider} from 'antd';

// Styles
import themeConfig from './styles/themeConfig';
import './styles/index.local.scss';

interface Props extends ButtonProps {
    children: React.ReactNode
};

export default function ButtonBase(props: Props) {
    const {children} = props;

    return (
        <ConfigProvider theme={themeConfig}>
            <Button type="primary">{children}</Button>
        </ConfigProvider>    
    );
}