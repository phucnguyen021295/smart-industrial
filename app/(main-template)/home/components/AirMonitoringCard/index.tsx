'use client'

// Components
import Card from '@/ts-components/Card';
import {PieChart} from '@/ts-components/Chart';
import Button from '@/ts-components/Button';
import Icon from '@/ts-components/Icon';

export default function AirMonitoringCard() {
  const data = [
    {
      type: 'Tốt',
      value: 27,
    },
    {
      type: 'Trung bình',
      value: 25,
    },
    {
      type: 'Kém',
      value: 18,
    },
    {
      type: 'Nguy hại',
      value: 18,
    },
    {
      type: 'Không có tín hiệu',
      value: 15,
    },
  ];

  const config = {
    color: ['#1FC6FF', '#59FFFF', '#F5E74F', '#FF386B', '#fff'],
  }

  return (
      <Card
        className="ts-home-fireChart"
        title={'Quan trắc không khí'}
        extra={
          <Button type='text'><Icon name="dots-horizontal" size={'huge'} /></Button>
        }
      >
        <PieChart data={data} config={config} />
      </Card>
  );
}