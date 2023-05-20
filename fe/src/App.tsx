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
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { verifyUserState } from 'api/login/api';

function App() {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['accessToken']);
  useEffect(() => {
    verifyUserState(cookies.accessToken, dispatch, true);
  },[])
  return (
    <>
      <Routes>
        <Route path="" element={<Introduce />} />
        <Route path="/naver_login" element={<Login />} />
        <Route path="/naver_login/logout" element={<LogoutWork />} />
        <Route path="/milestone/:projectId" element={<Milestone />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <Toast />
    </>
  );
}

export default App;
