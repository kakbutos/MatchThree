import { Suspense, useEffect } from 'react';
import AppRouter from './providers/router/AppRouter';
import './styles/index.scss';
import './fonts/fonts';
import ErrorBoundary from './providers/error-boundary/ErrorBoundary';
import { CssBaseline } from '@mui/material';
import { ThemeWrapper } from './providers/theme';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <ThemeWrapper>
      <CssBaseline />
      <ErrorBoundary>
        <Suspense fallback="">
          <AppRouter />
        </Suspense>
      </ErrorBoundary>
    </ThemeWrapper>
  );
}

export default App;
