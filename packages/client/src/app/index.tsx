import { Suspense, useEffect } from 'react';
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
    <Suspense fallback="">
      <AppRouter />
    </Suspense>
  );
}

export default App;
