import { memo } from "react";
import { Flex, Space, Badge } from "antd";

// Components
import Card from '@/ts-components/Card';
import Button from "@/ts-components/Button";
import Icon from "@/ts-components/Icon";

// Styles

function WasteWaterOutCart() {
    return (
        <Card
            className="ts-process-processed"
            title={'Nước thải đầu ra'}
            extra={
                <Button type='text'><Icon name="dots-horizontal" size={'huge'} /></Button>
            }
        >
            Nước thải đầu ra
        </Card>
    );
}

export default memo(WasteWaterOutCart)