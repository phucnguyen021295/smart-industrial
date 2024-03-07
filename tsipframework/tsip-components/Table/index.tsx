'use client'

import React, { memo } from 'react';
import {TableProps, Table, ConfigProvider} from 'antd';

// Styles
import themeConfig from './themeConfig';
import './index.local.scss';

interface Props extends TableProps {};

function TableBase(props: Props) {
    return (
        <ConfigProvider theme={themeConfig}>
            <Table className={`ts-components-table`} {...props} />
        </ConfigProvider>
    );
}

export default memo(TableBase)