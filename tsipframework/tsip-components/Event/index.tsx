import { ConfigProvider, Flex, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import moment from 'moment';

// Components
import Icon from '@/ts-components/Icon';

// Styles
import './index.local.scss';

interface Props {
    date: Date | number,
    status: 1 | 2,
    title: string
 };

export function Event(props: Props) {
    const { date, title, status} = props

    return (
        <Flex align='center' justify='space-between' className={`ts-components-event ${status === 2 ? 'ts-components-event-error' : 'ts-components-event-warning'}`}>
            
        </Flex>
    );
}

interface ListProps {
    key: string,
    heightList?: number,
    data: Props[],
}

export default function ListEvent(props: ListProps) {
    const { data, key, heightList = 400, ...otherProps } = props;

    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
        // if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
        //   appendData();
        // }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    List: {
                        itemPadding: '8px 0'
                    },
                    },
            }}
        >
            <List>
                <VirtualList
                    data={data}
                    height={heightList}
                    itemHeight={40}
                    itemKey={key}
                    onScroll={onScroll}
                >
                    {(item: Props) => (
                        <List.Item key={key} className={`ts-components-event ${item.status === 2 ? 'ts-components-event-error' : 'ts-components-event-warning'}`}>
                            <Flex align='center'>
                                <Icon name='warning' color={item.status === 2 ? 'rgba(231, 29, 54, 1)' : 'rgba(255, 159, 28, 1)'} />
                                <span className={'ts-components-event-title'}>{item.title}</span>
                            </Flex>
                            <span className={'ts-components-event-date'}>{moment(item.date).format('HH:mm:ss - DD/MM/YYYY')}</span>
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </ConfigProvider>
    );
}