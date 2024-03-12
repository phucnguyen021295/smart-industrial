import type { ThemeConfig } from 'antd';

import color from '@/tsipframework/tsip-global/themes/color';

const themeConfig: ThemeConfig = {
    components: {
        Select: {
            optionSelectedBg: 'rgba(126, 220, 251, 0.12)',
            optionSelectedColor: color.textColor
        },
    },
    token: {
        colorBgContainer: 'rgba(57, 205, 255, 0.12)',
        colorText: color.textSecondaryColor,
        colorBorder: 'rgba(126, 220, 251, 1)',
        borderRadius: 0,
        colorBgElevated: 'rgba(57, 205, 255, 0.12)',
        controlOutlineWidth: 0,
        colorPrimaryHover: 'rgba(126, 220, 251, 1)',
        colorTextPlaceholder: color.textSecondaryColor,
        colorPrimary: 'rgba(126, 220, 251, 1)',
        paddingXXS: 0
    }
};

export default themeConfig;