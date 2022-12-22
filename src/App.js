import './App.css';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'config/theme';
import Christmas from 'pages/Christmas';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { database, store } from './datasource';
import Result from './pages/Result';
const { ChristmasForm } = database;

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<Christmas />} />
          <Route path='/merry-christmas' element={<Result />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
