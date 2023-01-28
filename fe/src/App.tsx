import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Introduce from 'pages/Introduce';

function App() {
  return (
    <Routes>
      <Route path="" element={<Introduce />}></Route>
    </Routes>
  );
}

export default App;
