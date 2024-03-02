import { useTheme } from '@mui/material/styles';
import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, Button } from '@mui/material';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchToggleCurrentMode } from '@/store/theme/slice';

interface ThemeButtonProps {
  isAbsolutePosition?: boolean;
}

export const ThemeButton: React.FC<ThemeButtonProps> = props => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const onToggleTheme = () => {
    dispatch(fetchToggleCurrentMode());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.primary',
        borderRadius: 1,
        margin: 1,
        cursor: 'pointer',
        ...(props.isAbsolutePosition && {
          position: 'absolute',
          justifyContent: 'flex-end',
          top: 0,
          right: 0,
        }),
      }}>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={
          theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )
        }
        onClick={onToggleTheme}>
        {theme.palette.mode} mode
      </Button>
    </Box>
  );
};
