import { Components, Theme } from '@mui/material';
import { palette } from '../palette';
import { secondary } from '../palette/secondary';

export const MuiInputBase: Components<
  Omit<Theme, 'components'>
>['MuiInputBase'] = {
  defaultProps: {
    size: 'small',
    fullWidth: true,
  },
  styleOverrides: {
    root: {
      '&.MuiFormLabel-colorSecondary': {
        color: palette.white,
      },
      '&.MuiInputBase-colorSecondary': {
        color: palette.white,
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: palette.white,
        },
      },
      '&.MuiInputBase-colorSecondary.Mui-focused': {
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: secondary[700],
        },
      },
      '&.MuiInputBase-colorSecondary:hover:not(.Mui-focused)': {
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: palette.white,
        },
      },
    },
  },
};
