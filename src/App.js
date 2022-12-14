import './App.css';

import Christmas from 'pages/Christmas';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Christmas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
