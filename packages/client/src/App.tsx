import { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import ErrorBoundary from './app/providers/error-boundary/ErrorBoundary';
import { theme } from './theme';

// TODO COD-55 убрать фейковый компонент при добавлении Router и Redux
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <div className="App">Hello world! :)</div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
