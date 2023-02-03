import React from 'react';
import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import Introduce from 'pages/Introduce';

import 'styles/main.css';

function App() {
  return (
    <Routes>
      <Route path="" element={<Introduce />}></Route>
    </Routes>
  );
}

export default App;
