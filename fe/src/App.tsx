import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Introduce from 'pages/Introduce';

import 'styles/main.css';
import 'react-toastify/dist/ReactToastify.css';
import Toast from 'components/modules/Toast/Toast';
import Login from 'pages/Login';
import Milestone from 'pages/Milestone';

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Introduce />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/milestone/:projectId" element={<Milestone />}></Route>
      </Routes>
      <Toast />
    </>
  );
}

export default App;
