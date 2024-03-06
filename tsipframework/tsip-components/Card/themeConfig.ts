import type { ThemeConfig } from 'antd';

import color from '@/tsipframework/tsip-global/themes/color';

const themeConfig: ThemeConfig = {
    components: {
        Card: {
        },
    },
    token: {
        colorText: color.textColor,
        borderRadiusLG: 0
    }
};

export default themeConfig;