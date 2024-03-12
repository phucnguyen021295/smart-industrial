'use client'

import { memo } from 'react';
import { Flex } from 'antd';

// Components
import Card from '@/ts-components/Card';
import { ColumnChart } from '@/ts-components/Chart';

// Styles
import './index.local.scss';

function WaterCard() {
    const data = [
      {
        type: 'T9',
        value: 1500,
      },
      {
        type: 'T10',
        value: 3000,
      },
      {
        type: 'T11',
        value: 3500,
      },
      {
        type: 'T12',
        value: 4100,
      },
    ];


    const paletteSemanticRed = '#1FC6FF';
    const config = {
      color: paletteSemanticRed,
    };
    return (
        <Card
            className="ts-home-water"
            title={'Quản lý cấp Nước'}
        >
          <Flex justify="space-between">
            <div style={{width: '12.5vw'}}>
             <ColumnChart data={data} config={config} />
            </div>
            <Flex vertical className="ts-home-water-content">
              <span className="ts-home-water-content-subText">Tháng này</span>
              <span className="ts-home-water-content-number">2523 <span>m3</span></span>
              <div className="ts-home-water-content-driver" />
              <span className="ts-home-water-content-subText">Đơn vị dùng nhiều điện nhất</span>
              <span className="ts-home-water-content-address">Nhà máy May TNG Võ Nhai</span>
            </Flex>
          </Flex>
        </Card>
    );
}

export default memo(WaterCard)