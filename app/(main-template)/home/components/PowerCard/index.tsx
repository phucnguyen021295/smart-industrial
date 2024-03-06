'use client'

import { Space, Flex } from 'antd';
import { Column } from '@ant-design/charts';

// Components
import Card from '@/ts-components/Card';

// Styles
import './index.local.scss';

export default function AirMonitoringCard() {
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
        data,
        xField: 'type',
        yField: 'value',
        height: 150,
        seriesField: '',
        color: ({ type }: any) => {
          if (type === itemMax.type) {
            return brandColor;
          }
    
          return paletteSemanticRed;
        },
        label: {
          content: (originData: any) => {
            const val = parseFloat(originData.value);
    
            if (val < 0.05) {
              return (val * 100).toFixed(1) + '%';
            }
          },
          offset: 10,
        },
        legend: false,
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
      };
    return (
        <Card
            className="ts-home-power"
            title={'Quản lý cấp Điện'}
        >
          <Flex justify="space-between">
            <div style={{width: '12.5vw'}}>
              <Column {...config} />
            </div>
            <Flex vertical className="ts-home-power-content">
              <span className="ts-home-power-content-subText">Tháng này</span>
              <span className="ts-home-power-content-number">29304 <span>kWh</span></span>
              <div className="ts-home-power-content-driver" />
              <span className="ts-home-power-content-subText">Đơn vị dùng nhiều điện nhất</span>
              <span className="ts-home-power-content-address">Nhà máy May TNG Võ Nhai</span>
            </Flex>
          </Flex>
        </Card>
    );
}