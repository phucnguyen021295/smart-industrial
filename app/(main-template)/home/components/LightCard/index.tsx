'use client'

import { Flex } from 'antd';
import { Column } from '@ant-design/charts';

// Components
import Card from '@/ts-components/Card';

// Styles
import './index.local.scss';

export default function LightCard() {
    const data = [
        {
          type: 'T9',
          value: 1500,
        },
        {
          type: 'T10',
          value: 3500,
        },
        {
          type: 'T11',
          value: 2000,
        },
        {
          type: 'T12',
          value: 4100,
        },
      ];

      const itemMax = data.reduce((prev, current) => (prev && prev.value > current.value) ? prev : current)
      console.log(itemMax)

      const paletteSemanticRed = '#1FC6FF';
      const brandColor = '#FF9F1C';
      const config = {
        data,
        xField: 'type',
        yField: 'value',
        height: 150,
        seriesField: '',
        color: ({ type }: any) => {
        //   if (type === itemMax.type) {
        //     return brandColor;
        //   }
    
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
            className="ts-home-light"
            title={'Quản lý chiếu sáng'}
        >
          <Flex justify="space-between">
            <div style={{width: '12.5vw'}}>
             <Column {...config} />
            </div>
            <Flex vertical className="ts-home-light-content">
              <span className="ts-home-light-content-subText">Tổng số đèn</span>
              <span className="ts-home-light-content-number">12.525</span>
              <div className="ts-home-light-content-driver" />
              <span className="ts-home-light-content-subText">Đơn vị dùng nhiều điện nhất</span>
              <span className="ts-home-light-content-address">Nhà máy May TNG Võ Nhai</span>
            </Flex>
          </Flex>
        </Card>
    );
}