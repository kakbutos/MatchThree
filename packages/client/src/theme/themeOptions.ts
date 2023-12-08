import { ThemeOptions } from '@mui/material/styles';
import { secondary } from './palette/secondary';
import { primary } from './palette/primary';
import { palette } from './palette';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: primary[500],
      light: primary[50],
      dark: primary[900],
    },
    secondary: {
      main: secondary[700],
      dark: secondary[900],
      light: secondary[50],
      contrastText: palette.white,
    },
    text: {
      primary: palette.black,
      secondary: palette.grey,
      disabled: palette.greyLight,
    },
  },
};
