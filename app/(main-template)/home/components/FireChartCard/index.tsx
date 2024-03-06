'use client'

import { useState, useEffect, memo } from "react";
import { Space, Flex } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Area } from '@ant-design/charts';

// Components
import Card from '@/ts-components/Card';
import { RadioGroup } from "@/ts-components/Radio";


// Styles

const options = [
    { label: 'Ngày', value: 'day' },
    { label: 'Tuần', value: 'week' },
    { label: 'Tháng', value: 'month' },
];

const DATA: any = {
  day: [
    {date: '0h', value: 1},
    {date: '3h', value: 5},
    {date: '6h', value: 10},
    {date: '9h', value: 15},
    {date: 'Hiện tại', value: 6},
  ],
  week: [
    {date: 'Thứ 2', value: 10},
    {date: 'Thứ 3', value: 5},
    {date: 'Thứ 4', value: 8},
    {date: 'Thứ 5', value: 15},
    {date: 'Thứ 6', value: 20},
  ],
  month: [
    {date: 'Tháng 9', value: 200},
    {date: 'Tháng 10', value: 49},
    {date: 'Tháng 11', value: 80},
    {date: 'Tháng 12', value: 100},
  ]
}

function FireChartCard() {
    // const [data, setData] = useState([]);
    // console.log('data', data)
    const [value1, setValue] = useState('week');

    const onChange = ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio3 checked', value);
        setValue(value);
    };

    const data = DATA[value1];

    const config = {
      data,
      xField: 'date',
      yField: 'value',
      height: 150,
      xAxis: {
        range: [0, 1],
        tickCount: 7,
      },
      areaStyle: () => {
        return {
          fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
        };
      },
    };
    

    return (
        <Card
            className="ts-home-fireChart"
            title={'Số vụ cháy'}
            extra={<RadioGroup options={options} onChange={onChange} value={value1} />}
        >
            <Area {...config} />
        </Card>
    );
}

export default memo(FireChartCard)