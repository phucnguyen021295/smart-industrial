'use client'

import {memo} from 'react';
import {ConfigProvider, Select, SelectProps} from 'antd';

// Components
import Icon from '@/ts-components/Icon';

// Styles
import themeConfig from './themeConfig';
import './index.local.scss';

function SelectBase(props: SelectProps) {

    return (
        <ConfigProvider theme={themeConfig}>
           <Select suffixIcon={<Icon name='down' size='small' />} {...props}  />
        </ConfigProvider>
    );
}

export default memo(SelectBase)