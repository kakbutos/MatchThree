import { Suspense, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../theme';
import AppRouter from './providers/router/AppRouter';

import './styles/index.scss';
import './fonts/fonts';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback="">
        <CssBaseline />
        <AppRouter />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
