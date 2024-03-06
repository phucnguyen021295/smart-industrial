'use client'

import { Flex } from 'antd';

// Components
import Card from '@/ts-components/Card';
import Button from '@/ts-components/Button';
import Icon from '@/ts-components/Icon';
import Legend from '@/ts-components/Chart/Legend';

// Styles
import './index.local.scss';
import { tomorrow } from '@/ts-global/assets/fonts';

export default function WastewaterCard() {
  const data = [{label: 'Ổn định', color: 'blue', value: 23}, {label: 'Cảnh báo', color: 'red', value: 6}, {label: 'Khẩn cấp', color: 'black', value: 76}];
  return (
    <Card
      className="ts-home-waste-water"
      title={'Quan trắc nước thải'}
      extra={
        <Button type='text'><Icon name="dots-horizontal" size={'huge'} /></Button>
      }
    >
      <Flex justify="space-between">
        <Flex vertical className="ts-home-waste-water-content">
          <span className="ts-home-waste-water-content-subText">Lượng nước xử lý tháng này</span>
          <span className={`ts-home-waste-water-content-number ${tomorrow.className}`}>254.535 m3</span>
          <span className="ts-home-waste-water-content-subText">Bị vượt quan trắc (số lần)</span>
          <span className={`ts-home-waste-water-content-number ${tomorrow.className}`}>01</span>
        </Flex>
        <Flex vertical className="ts-home-waste-water-content">
          <span className="ts-home-waste-water-content-subText">Tổng số trạm</span>
          <span className={`ts-home-waste-water-content-number ${tomorrow.className}`}>14</span>
          {/* <Legend data={data} />  */}
        </Flex>
      </Flex>
      {/* <iframe src="http://10.84.240.167:3456/d-solo/bb89d47c-666f-4af9-bc0f-559048f86c4c/firecount?orgId=1&from=1704042000000&to=1709256974588&panelId=1" width="100%" height="200" frameborder="0"></iframe> */}
    </Card>
  );
}

