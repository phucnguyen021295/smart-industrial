'use client'

import React from 'react';
import { Flex } from 'antd';
import dynamic from 'next/dynamic';
import moment from 'moment';

// Components
const Clock = dynamic(() => import('@/ts-components/Clock'), { ssr: false })

// Styles
import '../styles/index.local.scss';

export default function Time() {
  return (
    <Flex justify={'space-between'} align='center'>
        <Clock className={'t-sip-header-clock'} />
        <div className={'t-sip-header-clock-border'} />
        <span className={'t-sip-header-date'}>{moment().format('dddd DD-MM-YYYY ')}</span>
        <div className={'t-sip-header-clock-border'} />
        <div className={'t-sip-header-weather'}>32 ° C</div>
    </Flex>
  );
}

