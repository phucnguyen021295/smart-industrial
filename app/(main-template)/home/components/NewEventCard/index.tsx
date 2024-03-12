'use client'

import { memo } from 'react';

// Components
import Card from '@/ts-components/Card';
import ListEvent from '@/tsipframework/tsip-components/Event';

const data = [
  {status: 2, date: 1707323329000, title: 'Cảnh báo đột nhập'},
  {status: 1, date: 1707323329000, title: 'Cảnh báo vượt ngưỡng quan trắc'},
  {status: 1, date: 1707323329000,  title: 'Cảnh báo nước thải'},
]

function NewEventCard() {
    return (
        <Card
            className="ts-home-new-event"
            title={'Sự kiện mới'}
            paddingBody={'0.625vw'}
        >
          <ListEvent data={data} key="eventCard" heightList={150} />
        </Card>
    );
}

export default memo(NewEventCard)