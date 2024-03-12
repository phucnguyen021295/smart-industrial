'use client'

import { memo } from 'react';
import { Flex } from 'antd';

// Components
import Card from '@/ts-components/Card';
import {ColumnChart} from '@/ts-components/Chart';

// Styles
import './index.local.scss';

function PowerCard() {
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
            className="ts-home-power"
            title={'Quản lý cấp Điện'}
        >
          <Flex justify="space-between">
            <div style={{width: '12.5vw'}}>
              <ColumnChart data={data} config={config} />
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

export default memo(PowerCard)