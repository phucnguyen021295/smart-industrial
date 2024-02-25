import type { ThemeConfig } from 'antd';

import color from '@/tsipframework/tsip-global/themes/color';

const themeConfig: ThemeConfig = {
    components: {
        Button: {
            colorPrimary: `rgba(31, 198, 255, .12)`,
            colorPrimaryHover: `rgba(31, 198, 255, .3)`,
            colorPrimaryActive: `rgba(31, 198, 255, .3)`,
            colorPrimaryBorder: `rgba(31, 198, 255, .2)`,
            defaultActiveBorderColor: 'red',
            borderRadius: 1,
        },
      },
};

export default themeConfig;