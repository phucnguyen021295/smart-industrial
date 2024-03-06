import { memo } from "react";
import { Flex, Space, Badge } from "antd";

// Components
import Card from '@/ts-components/Card';
import Button from "@/ts-components/Button";
import Icon from "@/ts-components/Icon";

// Styles

function ProcessedCard() {
    return (
        <Card
            className="ts-process-processed"
            title={'Các sự kiện cần sử lý'}
            extra={
                <Flex>
                    <Button type='text'><Icon name="search" size={'huge'} /></Button>
                    <Button type='text'><Icon name="synchronized" size={'huge'} /></Button>
                    <Button type='text'><Icon name="filter" size={'huge'} /></Button>
                </Flex>
            }
        >
            <Space size={32}>
                <Space>
                    <Badge color={'rgba(0, 0, 0, 1)'} style={{ backgroundColor: 'rgba(247, 253, 252, 1)' }} count={4} />
                    <span>Đang xử lý</span>
                </Space>
                <Space>
                    <Badge className="site-badge-count-109" color='#000' count={109} style={{ backgroundColor: '#fff' }} />
                    <span>Đã xử lý</span>
                </Space>
            </Space>
        </Card>
    );
}

export default memo(ProcessedCard)