import type { ThemeConfig } from 'antd';

import color from '@/tsipframework/tsip-global/themes/color';

const themeConfig: ThemeConfig = {
    components: {
        Table: {
            headerBg: 'rgba(255, 255, 255, 0.1)',
            headerColor: color.textSecondaryColor,
            headerBorderRadius: 4,
            headerSplitColor: 'transparent'
        },
    },
    token: {
        colorBgContainer: 'transparent',
        lineWidth: 0,
        fontSize: '0.875rem',
        lineHeight: '1.25rem'
    }
};

export default themeConfig;