import { ThemeOptions } from '@mui/material/styles';
import { secondary } from './palette/secondary';
import { primary } from './palette/primary';
import { palette } from './palette';
import { components } from './components';

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
    background: {
      default: palette.white,
      paper: primary[500],
    },
  },
  components,
};

export const themeOptionsDark: ThemeOptions = {
  palette: {
    mode: 'dark',
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
    background: {
      default: palette.black,
      paper: palette.black,
    },
  },
  components,
};
