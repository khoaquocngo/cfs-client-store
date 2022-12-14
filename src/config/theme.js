import { createTheme } from '@mui/system';

import { CONFIG_THEME } from './constant';

export const theme = createTheme({
  palette: {
    primary: {
      main: CONFIG_THEME.color.blue900,
      contrastText: CONFIG_THEME.color.white,
    },
  },
});
