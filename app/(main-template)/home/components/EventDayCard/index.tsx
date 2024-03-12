'use client'

import React from 'react';
import Image from "next/image";
import { Space, Flex } from 'antd';
import dynamic from 'next/dynamic';

// Components
import Card from '@/ts-components/Card';
import { H3 } from "@/ts-components/Text";
import Icon from "@/ts-components/Icon";
const PieChart = dynamic(() => import('@/ts-components/Chart/PieChart'));
import Button from "@/ts-components/Button";

// Styles
import './index.local.scss';
import { tomorrow } from "@/ts-global/assets/fonts";


function EventDayCard() {
    const data = [
        {
          type: 'Đã xử lý',
          value: 68,
        },
        {
          type: 'Hiện hữu',
          value: 18,
        },
    ];
    const config = {
        legend: false,
        color: ['#00C6EF', '#FF9F1C'],
        statistic: {
            content: {
              content: '68%',
            },
        },
    }
    return (
        <Card
            className="ts-home-eventDay"
            title={'Sự kiện an ninh trong ngày'}
            extra={<Button type='text'><Icon name="dots-horizontal" size={'huge'} /></Button>}
        >
            <Flex justify="space-between" align="center">
                <div className="ts-home-eventDay-chart">
                    <PieChart data={data} config={config} />
                </div>
                <Flex vertical className="ts-home-eventDay-right">
                    <Space direction="vertical" size={4} style={{ display: 'flex' }}>
                        <div className="ts-home-eventDay-right-top">
                            <Image
                                src={require('./images/label.svg')}
                                alt="star"
                                className={'ts-home-eventDay-right-top-img-label'}
                                priority
                            />
                            <Flex className="ts-home-eventDay-right-top-content" align="center">
                                <Image
                                    src={require('./images/iconStar.svg')}
                                    alt="star"
                                    className={'ts-home-eventDay-right-top-icon-star'}
                                    priority
                                />
                                <Flex className="ts-home-eventDay-right-top-content-number" align="center">
                                    <H3 className={tomorrow.className}>18</H3>
                                    <span>Hiện hữu</span>
                                </Flex>
                            </Flex>
                        </div>
                        <div className="ts-home-eventDay-right-bottom">
                            <Image
                                src={require('./images/label.svg')}
                                alt="star"
                                className={'ts-home-eventDay-right-bottom-img-label'}
                                priority
                            />
                            <Flex className="ts-home-eventDay-right-bottom-content" align="center" justify="space-between">
                                <Flex className="ts-home-eventDay-right-bottom-content-number" align="center">
                                    <span>Đã xử lý</span>
                                    <H3 className={tomorrow.className}>68</H3>
                                </Flex>
                                <Image
                                    src={require('./images/iconStarWhite.svg')}
                                    alt="star"
                                    className={'ts-home-eventDay-right-bottom-icon-star'}
                                    priority
                                />
                            </Flex>
                        </div>
                    </Space>
                    
                </Flex>
            </Flex>
        </Card>
    );
}

export default React.memo(EventDayCard)