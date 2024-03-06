'use client'

import {memo} from 'react';
import { Layout, Space } from 'antd';
import dynamic from 'next/dynamic';

// Components
const ProcessedCard = dynamic(() => import('@/app/(main-template)/process/components/ProcessedCard'));
const Scada = dynamic(() => import('@/app/(main-template)/process/components/Scada'));

const { Sider, Content } = Layout;


function Process() {
  return (
    <Layout className="ts-process-main" style={{background: 'transparent', minHeight: '91vh'}}>
        <Sider width={'23.7vw'} style={{paddingLeft: '1.25vw', background: 'transparent'}}>
          <Space direction="vertical" size={8} style={{ display: 'flex' }}>
              <ProcessedCard />
          </Space>
        </Sider>
        {/* <Content>
          <Scada id="scada" urlFile="scada/LayoutXLNT.g" data_init={[{label: 'StirMotor1/OperatingState', value: 2}]}  />
        </Content> */}
    </Layout>
  );
}

export default memo(Process)
