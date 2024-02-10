import { createTheme, ThemeProvider } from '@mui/material';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemeStore } from '@/store/theme';
import React from 'react';
import { ThemeMode } from '@/types/theme/mode';
import { themeOptions, themeOptionsDark } from '@/theme/themeOptions';

const ThemeWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const mode = useAppSelector(ThemeStore.selectors.selectMode);

  const theme = React.useMemo(
    () =>
      createTheme(mode === ThemeMode.Light ? themeOptions : themeOptionsDark),
    [mode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
