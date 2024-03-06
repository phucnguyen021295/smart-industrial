'use client'https://wirecloud.readthedocs.io/en/stable/

import {memo} from 'react';
import { Flex, List } from "antd";

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
                    <Flex align='center' justify='space-between'>
                        <div>
                            {item.label}
                        </div>
                        <span>{item.value}</span>
                    </Flex>
                </List.Item>
            )}
        />
    )
}

export default memo(Legend);