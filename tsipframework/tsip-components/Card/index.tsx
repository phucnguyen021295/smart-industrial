'use client'

import merge from "lodash/merge";
import { memo } from "react";
import Image from "next/image";
import { Card, CardProps, ConfigProvider, Flex } from 'antd';

import './index.local.scss';
import themeConfig from './themeConfig';

interface CardHeaderProps {
    title: string;
    extra?: React.ReactNode
}

function CardTitle(props: CardHeaderProps) {
    const {title, extra} = props;
    return (
        <div className="t-sip-components-card-header">
             <Image
                src={require('./images/header.svg')}
                alt="Card Title"
                className={'t-sip-components-card-header-img'}
                priority
             />
             <Flex className="t-sip-components-card-header-content" align="center" justify="space-between">
                <span>{title}</span>
                {extra && extra}
             </Flex>
        </div>
    )
}

interface Props extends CardProps {
    title: string;
    extra?: React.ReactNode;
    children: React.ReactNode;
    paddingBody?: number | string;
}

function CardBase(props: Props) {
    const {title, extra, children, paddingBody = '1.04vw'} = props;

    const paddingBodyConfig = {
        token: {
            paddingLG: paddingBody,
            padding: paddingBody
        }
    }

    return (
        <ConfigProvider theme={merge(themeConfig, paddingBodyConfig)}>
            <Card
                className="t-sip-components-card"
                title={<CardTitle title={title} extra={extra} />}
                bordered={false}
                >
                {children}
            </Card>
        </ConfigProvider>
    );
}

export default memo(CardBase)