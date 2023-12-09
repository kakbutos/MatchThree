import { useEffect } from 'react';
import './styles/index.scss';
import './fonts/fonts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../theme';
import { LoginPage } from '../pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GamePage } from '@/pages/game';

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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="game" element={<GamePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
