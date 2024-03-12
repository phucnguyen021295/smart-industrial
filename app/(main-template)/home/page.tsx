'use client'

import { memo } from 'react';
import { Flex, Layout, MenuProps, Space } from 'antd';
import dynamic from 'next/dynamic';

// Components
const EventDayCard = dynamic(() => import('@/app/(main-template)/home/components/EventDayCard'));
const FireChartCard = dynamic(() => import('@/app/(main-template)/home/components/FireChartCard'));
const AirMonitoringCard = dynamic(() => import('@/app/(main-template)/home/components/AirMonitoringCard'));
const WastewaterCard = dynamic(() => import('@/app/(main-template)/home/components/WastewaterCard'));

const PowerCard = dynamic(() => import('@/app/(main-template)/home/components/PowerCard'));
const WaterCard = dynamic(() => import('@/app/(main-template)/home/components/WaterCard'));
const LightCard = dynamic(() => import('@/app/(main-template)/home/components/LightCard'));
const NewEventCard = dynamic(() => import('@/app/(main-template)/home/components/NewEventCard'));


const MapGeo = dynamic(() => import('@/app/(main-template)/home/components/MapGeo'));

const Select = dynamic(() => import('@/ts-components/Select'));

const { Sider, Content } = Layout;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};


function Home() {
  return (
    <Layout style={{background: 'transparent', minHeight: '92vh'}}>
        <Sider width={'23.7vw'} style={{paddingLeft: '1.25vw', background: 'transparent'}}>
          <Space direction="vertical" size={8} style={{ display: 'flex' }}>
              <EventDayCard />
              <FireChartCard />
              <WastewaterCard />
              <AirMonitoringCard />
          </Space>
        </Sider>
        <Content>
          {/* <MapGeo /> */}
          <Flex justify={'center'}>
            <Select
              defaultValue="all"
              style={{ width: '14.8vw' }}
              onChange={handleChange}
              options={[
                { value: 'all', label: 'Tất cả các khu công nghiệp' },
                { value: 'quangminh', label: 'Khu công nghiệp Quang Minh' },
                { value: 'gialam', label: 'Khu công nghiệp Gia Lâm' },
                { value: 'yenbai', label: 'Khu công nghiệp Yên Bái'},
              ]}
            />
          </Flex>
          
        </Content>
        <Sider width={'23.7vw'} style={{background: 'transparent'}}>
          <Space direction="vertical" size={10} style={{ display: 'flex' }}>
            <PowerCard />
            <WaterCard />
            <LightCard />
            <NewEventCard />
          </Space>
        </Sider>
    </Layout>
  );
}

export default memo(Home)
