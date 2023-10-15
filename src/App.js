import './App.css';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'config/theme';
import Christmas from 'pages/Christmas';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Result from './pages/Result';

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
