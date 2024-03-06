import type { ThemeConfig } from 'antd';

import color from '@/tsipframework/tsip-global/themes/color';

const themeConfig: ThemeConfig = {
    components: {
        Radio: {
            buttonBg: '#0F2839',
            buttonCheckedBg: 'linear-gradient(180deg, rgba(31, 198, 255, 0.32) 0%, rgba(31, 198, 255, 0) 100%)',
            buttonSolidCheckedColor: 'transparent',
            buttonColor: color.textSecondaryColor
        },
    },
    token: {
        colorBorder: 'transparent',
        colorPrimary: '#D9FEFA',
        colorPrimaryBorder: 'transparent',
        fontSize: '0.875rem'
    }
};

export default themeConfig;