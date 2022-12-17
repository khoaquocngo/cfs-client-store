import { createTheme } from '@mui/material/styles';

import { CONFIG_THEME } from './constant';

export const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 14,
  },
  palette: {
    primary: {
      main: CONFIG_THEME.color.blue900,
      contrastText: CONFIG_THEME.color.white,
    },
  },
});
