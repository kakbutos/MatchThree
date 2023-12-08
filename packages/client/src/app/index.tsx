import { useEffect } from 'react';
import './styles/index.scss';
import './fonts/fonts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../theme';
import { LoginPage } from '../pages/login';

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
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginPage />
      </ThemeProvider>
    </>
  );
}

export default App;
