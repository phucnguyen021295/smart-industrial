'use client'

import React, { memo } from 'react';
import Image from "next/image";
import { Flex } from 'antd';
import dynamic from 'next/dynamic';

// Components
const Time = dynamic(() => import('@/app/(main-template)/components/Header/Time'), { ssr: false })
import Menu, {MenuItemProps} from '@/ts-components/Menu';

// Styles
import './styles/index.local.scss';

const items: MenuItemProps[] = [
  {
    label: 'Sự kiện',
    key: 'event',
    link: '/home',
  },
  {
    label: 'Xử lý',
    key: 'process',
    link: '/process',
  },
  {
    label: 'CCTV',
    key: 'cctv',
    link: '/cctv',
  },
  {
    label: 'Khác',
    key: 'other',
    link: '/other',
  },
];

function Header() {
  return (
      <div className={'t-sip-header-container'}>
        <Image
            src={require('./styles/images/banner.png')}
            alt="Banner"
            className={'t-sip-header-banner'}
            priority
         />
        <Flex className={'t-sip-header-content'} justify={'space-between'} align={'center'}>
            <div className={'t-sip-header-left'}>
              <Time />
            </div>
            <Image
                src={require('./styles/images/logo.svg')}
                alt="Logo"
                className={'t-sip-header-logo'}
                priority
             />
             <div  className={'t-sip-header-right'}>
                 <Menu items={items} />
             </div>
        </Flex>
      </div>
  );
}

export default memo(Header);

