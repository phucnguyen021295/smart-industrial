"use client";

import { memo } from "react";
import { TableColumnsType } from "antd";

// Components
import Card from "@/ts-components/Card";
import Button from "@/ts-components/Button";
import Icon from "@/ts-components/Icon";
import TableBase from "@/ts-components/Table";

// Styles
import './index.local.scss';
import moment from "moment";

interface DataType {
  key: React.Key;
  name: string;
  time: Date | number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Lưu lượng xử lý",
    dataIndex: "name",
    key: 'name',
  },
  {
    title: "Thời gian xảy ra",
    dataIndex: "time",
    key: "time",
    align: 'right',
    render: (time) => (<span className={'ts-components-event-date'}>{moment(time).format('HH:mm:ss DD/MM/YYYY')}</span>),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "2240.19[u]",
    time: 1707323329000,
  },
  {
    key: "2",
    name: "2241.58[u]",
    time: 1707323329000,
  },
  {
    key: "3",
    name: "2241.58[u]",
    time: 1707323329000,
  },
  {
    key: "4",
    name: "2271.58[u]",
    time: 1707323329000,
  },
  {
    key: "5",
    name: "2441.58[u]",
    time: 1707323329000,
  },
];

function Stage1() {
  return (
    <div className="ts-scada-stage1">
      <Card
        title={"Lượng nước xử lý giai đoạn 1"}
        paddingBody={'0.42vw'}
        extra={
          <Button type="text">
            <Icon name="dots-horizontal" size={"huge"} />
          </Button>
        }
      >
        <TableBase
          columns={columns}
          dataSource={data}
          size="small"
          pagination={false}
        />
      </Card>
    </div>
  );
}

export default memo(Stage1);
