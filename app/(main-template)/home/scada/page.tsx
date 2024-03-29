'use client'

import {memo} from 'react';
import { Layout, Space, Flex } from 'antd';
import dynamic from 'next/dynamic';

// Components
const WasteWaterOutCart = dynamic(() => import('@/app/(main-template)/home/scada/components/WasteWaterOutCart'));
import EventCard from '@/app/(main-template)/home/scada/components/EventCard';
// const Scada = dynamic(() => import('@/app/(main-template)/home/scada/components/Scada/index2'));
const Scada = dynamic(() => import('@/app/(main-template)/home/scada/components/Scada'));
const Stage1 = dynamic(() => import('@/app/(main-template)/home/scada/components/Stage1'));
const Stage2 = dynamic(() => import('@/app/(main-template)/home/scada/components/Stage2'));
const Info = dynamic(() => import('@/app/(main-template)/home/scada/components/Info'));

// Styles
import './page.local.scss';

const { Sider, Content } = Layout;

function ScadaScreen() {
  return (
    <Layout className="ts-scada-main" style={{background: 'transparent', minHeight: '91vh'}}>
        <Sider width={'23.7vw'} style={{paddingLeft: '1.25vw', background: 'transparent'}}>
          <Space direction="vertical" size={8} style={{ display: 'flex' }}>
              <WasteWaterOutCart />
              <EventCard />
          </Space>
        </Sider>
        <Content className='ts-scada-main-content'>
          <Scada id="scada" urlFile="../LayoutXLNT-01.g" data_init={[{label: 'StirMotor1/OperatingState', value: 1}]} />
          <Flex justify={'space-between'} align='flex-start' className='ts-scada-main-content-list'>
            <Stage1 />
            <Stage2 />
            <Info />
          </Flex>
        </Content>
    </Layout>
  );
}

export default memo(ScadaScreen)
