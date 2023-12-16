import { Components, Theme } from '@mui/material';

export const MuiButton: Components<Omit<Theme, 'components'>>['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
  },
};
