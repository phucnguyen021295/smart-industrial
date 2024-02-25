'use client'

import React, { useState } from 'react';
import Image from "next/image";
import { Flex } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

// Styles
import './styles/index.local.scss';

export interface MenuItemProps {
    label: string,
    link: string,
    key: string,
    onClick?: () => void,
    isSelected?: boolean
};

const MenuItem = React.memo(function MenuItem(props: MenuItemProps) {
    const {label, link, key, isSelected} = props;

    return (
        <div key={key} className={`t-sip-components-menu-item${isSelected ? ' t-sip-components-menu-item-active' : ''}`}>
            <Image
                src={require('./styles/images/button.png')}
                alt="btn"
                className={'t-sip-components-menu-item-img'}
                priority
             />
            <Link href={link} className='t-sip-components-menu-item-title'>{label}</Link>
        </div>
    )
})

interface MenuProps {
    items: MenuItemProps[],
};

export default function Menu(props: MenuProps) {
  const pathname = usePathname();
  const {items} = props;

  return (
    <Flex align={'center'}>
        {
            items.map((item) => <MenuItem key={item.key} link={item.link} isSelected={pathname === item.link} label={item.label} />)
        }
    </Flex>
  )
}

