import type { ThemeConfig } from 'antd';

import color from '@/tsipframework/tsip-global/themes/color';

const themeConfig: ThemeConfig = {
    components: {
        Card: {
            headerBg: 'linear-gradient(98.86deg, rgba(48, 65, 78, 0.6) 6.74%, rgba(6, 27, 43, 0.2) 93.26%)'
        },
    },
    token: {
        colorText: color.textColor,
        borderRadiusLG: 0,
    }
};

export default themeConfig;