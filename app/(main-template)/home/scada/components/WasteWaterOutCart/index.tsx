"use client";

import { memo } from "react";
import { Flex, Space, Badge, TableColumnsType } from "antd";

// Components
import Card from "@/ts-components/Card";
import Button from "@/ts-components/Button";
import Icon from "@/ts-components/Icon";
import TableBase from "@/ts-components/Table";

// Styles
import "./index.local.scss";

interface DataType {
  key: React.Key;
  name: string;
  numeral: string;
  status: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Tên chỉ số",
    dataIndex: "name",
    key: 'name',
    render: (name) => (
        <Flex align="center">
            <Icon name="event1" size="huge"  />
            <span style={{paddingLeft: 8}}>{name}</span>
        </Flex>
    ),
  },
  {
    title: "Chỉ số",
    dataIndex: "numeral",
    key: "numeral"
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: 'status',
    render: () => (
        <Flex justify="space-between" align="center">
            <span>GOOD</span>
            <span>Sử dụng</span>
            <Icon name="radio" size="huge"  />
        </Flex>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "COD",
    numeral: "26.77mg/l",
    status: 1,
  },
  {
    key: "2",
    name: "TSS",
    numeral: "13.10mg/l",
    status: 1,
  },
  {
    key: "3",
    name: "Ph",
    numeral: "7.15mg.l",
    status: 1,
  },
  {
    key: "4",
    name: "DO",
    numeral: "2.1mg.l",
    status: 1,
  },
  {
    key: "5",
    name: "Temp",
    numeral: "29.94oC",
    status: 1,
  },
  {
    key: "6",
    name: "NH4+",
    numeral: "0.1mg.l",
    status: 1,
  },
  {
    key: "7",
    name: "Flow out 1",
    numeral: "192.28m3/h",
    status: 1,
  },
  {
    key: "8",
    name: "Flow in 1",
    numeral: "182.28m3/h",
    status: 1,
  },
];

function WasteWaterOutCart() {
  return (
    <Card
      title={"Nước thải đầu ra"}
      paddingBody={'0.3125vw'}
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
  );
}

export default memo(WasteWaterOutCart);
