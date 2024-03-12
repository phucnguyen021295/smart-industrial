'use client'

import { Flex } from 'antd';
import dynamic from 'next/dynamic';

// Components
import Card from '@/ts-components/Card';
import Button from '@/ts-components/Button';
import Icon from '@/ts-components/Icon';
const ColumnChart = dynamic(() => import('@/ts-components/Chart/ColumnChart'));
import Legend from '@/ts-components/Chart/Legend';

// Styles
import './index.local.scss';

export default function WastewaterCard() {
  const items = [
    {label: 'Khẩn cấp', value: 1, color: 'rgba(255, 56, 107, 1)'},
    {label: 'Cảnh báo', value: 13, color: 'rgba(255, 159, 28, 1)'}
  ]

  const data = [
    {
      type: 'T9',
      value: 2500,
    },
    {
      type: 'T10',
      value: 1500,
    },
    {
      type: 'T11',
      value: 800,
    },
    {
      type: 'T12',
      value: 3700,
    },
  ];

  const itemMax = data.reduce((prev, current) => (prev && prev.value > current.value) ? prev : current)
  const paletteSemanticRed = '#1FC6FF';
  const brandColor = '#FF9F1C';
  const config = {
    color: ({ type }: any) => {
      if (type === itemMax.type) {
        return brandColor;
      }

      return paletteSemanticRed;
    },
  };
  return (
    <Card
      className="ts-home-waste-water"
      title={'Quan trắc nước thải'}
      extra={
        <Button type='text'><Icon name="dots-horizontal" size={'huge'} /></Button>
      }
    >
     <Flex justify="space-between">
            <div style={{width: '12.5vw'}}>
              <ColumnChart data={data} config={config} />
            </div>
            <Flex vertical className="ts-home-power-content">
            <span className="ts-home-water-content-subText">Tháng này</span>
              <span className="ts-home-water-content-number">152.152 <span>m3</span></span>
              <div className="ts-home-power-content-driver" />
              <Legend data={items} />
            </Flex>
          </Flex>
    </Card>
  );
}

