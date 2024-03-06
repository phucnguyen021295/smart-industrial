'use client'

import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, ConfigProvider, RadioGroupProps } from 'antd';
import themeConfig from './themeConfig';

// Styles
import './index.local.scss';

interface Props extends RadioGroupProps {}

const RadioGroup: React.FC = (props: Props) => {
  const {...otherProps} = props

  return (
    <ConfigProvider theme={themeConfig}>
        <Radio.Group className='ts-components-radio-button' optionType="button" {...otherProps} />
    </ConfigProvider>
  );
};

export default RadioGroup;