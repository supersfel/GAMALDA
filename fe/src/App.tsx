import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Introduce from 'pages/Introduce';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/main.css';

import Toast from 'components/modules/Toast/Toast';
import Login from 'pages/Login';
import Milestone from 'pages/Milestone';
import LogoutWork from 'pages/LogoutWork';
import MyPage from 'pages/MyPage';
import ProjectSet from 'pages/ProjectSet';

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Introduce />} />
        <Route path="/naver_login" element={<Login />} />
        <Route path="/naver_login/logout" element={<LogoutWork />} />
        <Route path="/milestone/:projectId" element={<Milestone />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route
          path="/milestone/projectset/:projectId"
          element={<ProjectSet />}
        />
      </Routes>
      <Toast />
    </>
  );
}

export default App;
