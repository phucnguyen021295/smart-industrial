'use client'

import { memo } from "react";
import merge from "lodash/merge";
import { Column, ColumnConfig } from '@ant-design/charts';

interface Props {
  data:  {type: string; value: number | string }[];
  config?: ColumnConfig;
  height?: number;
}

function ColumnChart(props: Props) {
  const { data, config, height = 150 } = props;
  const _config = {
    data,
    xField: 'type',
    yField: 'value',
    height: height,
    seriesField: '',
    // color: ({ type }: any) => {
    //   if (type === itemMax.type) {
    //     return brandColor;
    //   }

    //   return paletteSemanticRed;
    // },
    label: {
      content: (originData: any) => {
        const val = parseFloat(originData.value);

        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return (
    <Column {...merge(_config, config)} />
  );
}

export default memo(ColumnChart)