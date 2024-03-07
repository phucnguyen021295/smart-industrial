'use client'

import { memo } from "react";
import dynamic from "next/dynamic";

// Components
import Card from '@/ts-components/Card';
import Button from "@/ts-components/Button";
import Icon from "@/ts-components/Icon";
const ListEvent = dynamic(() => import('@/ts-components/Event'));

const data = [
  {status: 1, date: 1707323329000, title: 'CAO BUN BLSC'},
  {status: 1, date: 1707323329000, title: 'MAY THOI KHI 3'},
  {status: 1, date: 1707323329000,  title: 'VAN_DIEN_1'},
  {status: 1, date: 1707323329000,  title: 'VAN DIEN 2'},
  {status: 1, date: 1707369817000,  title: 'BOM BE DIEU HOA 1'},
  {status: 1, date: 1707369817000,  title: 'KHUAY PHAN UNG 1'},
  {status: 1, date: 1707369817000,  title: 'KHUAY PHAN UNG 2'},
  {status: 1, date: 1707369817000,  title: 'KHUAY PHAN UNG 3'},
  {status: 1, date: 1707369838000,  title: 'BOM BE GOM 2'},
  {status: 1, date: 1707369838000,  title: 'MAY TACH RAC'},
  {status: 1, date: 1707381778000,  title: 'CAO BUN BLTC'},
  {status: 1, date: 1707387477000,  title: 'MAY THOI KHI 2'},
  {status: 1, date: 1707387477000,  title: 'MAY THOI KHI 2'}
]

function EventCard() {
    return (
        <Card
            title={'Sự kiện'}
            paddingBody={'0.625vw'}
            extra={
                <Button type='text'><Icon name="dots-horizontal" size={'huge'} /></Button>
            }
        >
            <ListEvent data={data} key="eventCard" heightList={450} />
        </Card>
    );
}

export default memo(EventCard)