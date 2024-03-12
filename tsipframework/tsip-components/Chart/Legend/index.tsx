'use client'

import {memo} from 'react';
import { List, Space } from "antd";

// Styles
import './index.local.scss';

interface Props {
    data: {label: string, value: number, color: string}[]
}

function Legend(props: Props) {
    const {data} = props
    return (
        <List
            className='ts-components-chart-legend'
            dataSource={data}
            renderItem={(item) => (
                <List.Item >
                    <Space>
                        <div className='ts-components-chart-legend-dot' style={{backgroundColor: item.color}} />
                        {item.label}
                    </Space>
                    <span style={{color: item.color}}>{item.value}</span>
                </List.Item>
            )}
        />
    )
}

export default memo(Legend);