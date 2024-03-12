"use client";

import { memo } from "react";

// Components
import Card from "@/ts-components/Card";
import Button from "@/ts-components/Button";
import Icon from "@/ts-components/Icon";

// Styles
import './index.local.scss';
import Link from "next/link";
import { Flex } from "antd";

function Info() {
  return (
    <div className="ts-scada-info">
      <Card
        title={"Thông tin liên quan"}
        paddingBody={'0.42vw 1.04vw'}
        extra={
          <Button type="text">
            <Icon name="dots-horizontal" size={"huge"} />
          </Button>
        }
      >
        <Flex vertical className="ts-scada-info-content">
          <Link href={'#'}>Hướng dẫn vận hành hệ thống</Link>
          <Link href={'#'}>Luật bảo vệ môi trường năm 2020</Link>
          <Link href={'#'}>Nghị định 08/2022/NĐ-CP</Link>
          <Link href={'#'}>Nghị định 35/2022/NĐ-CP</Link>
          <Link href={'#'}>Thông tư 02/2022/TT-BTNMT</Link>
          <Link href={'#'}>Thông tư 02/2022/TT-BTNMT</Link>
        </Flex>
      </Card>
    </div>
  );
}

export default memo(Info);
