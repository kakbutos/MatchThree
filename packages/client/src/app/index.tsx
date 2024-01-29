import { Suspense, useEffect } from 'react';
import AppRouter from './providers/router/AppRouter';
import './styles/index.scss';
import './fonts/fonts';
import ErrorBoundary from './providers/error-boundary/ErrorBoundary';
import { theme } from '../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

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
      <CssBaseline />
      <ErrorBoundary>
        <Suspense fallback="">
          <AppRouter />
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
