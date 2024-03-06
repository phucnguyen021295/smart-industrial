'use client'

import merge from "lodash/merge";
import { Pie, PieConfig } from '@ant-design/charts';

// Styles
import color from '@/ts-global/themes/color';

interface Props {
  data:  {type: string; value: number | string }[];
  config?: PieConfig;
  height?: number;
}

export default function PieChart(props: Props) {
  const { data, config, height = 150 } = props;
  const _config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    height: height,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
        color: color.textSecondaryColor
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    pieStyle: {
      lineWidth: 0,
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '16px',
          color: color.textColor
        },
        content: '68.2%',
      },
    },
  };
  return (
    <Pie {...merge(_config, config)} />
  );
}