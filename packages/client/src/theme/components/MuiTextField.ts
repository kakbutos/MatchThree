import { Components, Theme } from '@mui/material';
import { palette } from '../palette';

export const MuiTextField: Components<
  Omit<Theme, 'components'>
>['MuiTextField'] = {
  defaultProps: {
    size: 'small',
    fullWidth: true,
  },
  styleOverrides: {
    root: {
      '.MuiFormLabel-colorSecondary': {
        color: palette.white,
      },
      '.MuiInputBase-colorSecondary': {
        color: palette.white,
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: palette.white,
        },
      },
      '.MuiInputBase-colorSecondary:hover:not(.Mui-focused)': {
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: palette.white,
        },
      },
    },
  },
};
