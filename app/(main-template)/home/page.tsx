'use client'

import { memo } from 'react';
import { Layout, Space } from 'antd';
import dynamic from 'next/dynamic';

// Components
const EventDayCard = dynamic(() => import('@/app/(main-template)/home/components/EventDayCard'));
const FireChartCard = dynamic(() => import('@/app/(main-template)/home/components/FireChartCard'));
const AirMonitoringCard = dynamic(() => import('@/app/(main-template)/home/components/AirMonitoringCard'));
const WastewaterCard = dynamic(() => import('@/app/(main-template)/home/components/WastewaterCard'));

const PowerCard = dynamic(() => import('@/app/(main-template)/home/components/PowerCard'));
const WaterCard = dynamic(() => import('@/app/(main-template)/home/components/WaterCard'));
const LightCard = dynamic(() => import('@/app/(main-template)/home/components/LightCard'));


const MapGeo = dynamic(() => import('@/app/(main-template)/home/components/MapGeo'));
const Card = dynamic(() => import('@/ts-components/Card'));
const { Sider, Content } = Layout;

// Styles
import './page.local.scss';

function Home() {
  return (
    <Layout className="ts-home-main" style={{background: 'transparent', minHeight: '91vh'}}>
        <Sider width={'23.7vw'} style={{paddingLeft: '1.25vw', background: 'transparent'}}>
          <Space direction="vertical" size={8} style={{ display: 'flex' }}>
              <EventDayCard />
              <FireChartCard />
              <WastewaterCard />
              <AirMonitoringCard />
          </Space>
        </Sider>
        <Content><MapGeo /></Content>
        <Sider width={'23.7vw'} style={{background: 'transparent'}}>
          <Space direction="vertical" size={10} style={{ display: 'flex' }}>
            <PowerCard />
            <WaterCard />
            <LightCard />
            <Card title={'Sự kiện mới'}>
              Sự kiện mới
            </Card>
          </Space>
        </Sider>
    </Layout>
  );
}

export default memo(Home)
