'use client'

import {memo} from 'react';
import { Layout, Space } from 'antd';
import dynamic from 'next/dynamic';

// Components
const WasteWaterOutCart = dynamic(() => import('@/app/(main-template)/home/scada/components/WasteWaterOutCart'));
const Scada = dynamic(() => import('@/app/(main-template)/process/components/Scada'));

const { Sider, Content } = Layout;


function ScadaScreen() {
  return (
    <Layout className="ts-process-main" style={{background: 'transparent', minHeight: '91vh'}}>
        <Sider width={'23.7vw'} style={{paddingLeft: '1.25vw', background: 'transparent'}}>
          <Space direction="vertical" size={8} style={{ display: 'flex' }}>
              <WasteWaterOutCart />
          </Space>
        </Sider>
        {/* <Content>
          <Scada id="scada" urlFile="scada/LayoutXLNT.g" data_init={[{label: 'StirMotor1/OperatingState', value: 2}]}  />
        </Content> */}
    </Layout>
  );
}

export default memo(ScadaScreen)
