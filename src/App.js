import './App.css';

import { ThemeProvider } from '@mui/system';
import { theme } from 'config/theme';
import Christmas from 'pages/Christmas';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { database, store } from './datasource';
const { ChristmasForm } = database;

function App() {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  return (
    <BrowserRouter>
      {/* <ThemeProvider theme={theme}> */}
      <Routes>
        <Route path='/' element={<Christmas />} />
      </Routes>
      {/* </ThemeProvider> */}
    </BrowserRouter>
  );
}

export default App;
