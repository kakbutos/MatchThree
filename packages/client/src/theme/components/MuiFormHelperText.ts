import { Components, Theme } from '@mui/material';

export const MuiFormHelperText: Components<
  Omit<Theme, 'components'>
>['MuiFormHelperText'] = {
  styleOverrides: {
    root: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
};
