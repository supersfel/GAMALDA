import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Introduce from 'pages/Introduce';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/main.css';

import Toast from 'components/modules/Toast/Toast';
import Login from 'pages/Login';
import Milestone from 'pages/Milestone';
import LogoutWork from 'pages/LogoutWork';

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Introduce />}></Route>
        <Route path="/naver_login" element={<Login />}></Route>
        <Route path="/naver_login/logout" element={<LogoutWork />}></Route>
        <Route path="/milestone/:projectId" element={<Milestone />}></Route>
      </Routes>
      <Toast />
    </>
  );
}

export default App;
