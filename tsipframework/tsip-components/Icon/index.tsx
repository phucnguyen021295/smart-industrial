'use client'

import React, { memo, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';

const Icons = {
    ['dots-horizontal']: dynamic(() => import('./images/dots-horizontal')),
    ['search']: dynamic(() => import('./images/search')),
    ['synchronized']: dynamic(() => import('./images/synchronized')),
    ['filter']: dynamic(() => import('./images/filter')),
    ['warning']: dynamic(() => import('./images/warning')),
    ['event1']: dynamic(() => import('./images/event1')),
    ['radio']: dynamic(() => import('./images/radio')),
};

const SIZE = {
    small: 14,
    normal: 16,
    medium: 18,
    large: 20,
    huge: 24,
} as const;

interface Props {
    name: keyof typeof Icons;
    size?: keyof typeof SIZE;
    color?: string;
    className?: string;
}

function IconBase(props: Props) {
    const { name, size = 'normal', color, className } = props;
    const Icon = Icons[name];
    return (
        <Icon className={className} width={SIZE[size]} height={SIZE[size]} color={color} />
    );
}

export default memo(IconBase);