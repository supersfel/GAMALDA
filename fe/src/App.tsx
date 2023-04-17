import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Introduce from 'pages/Introduce';

import 'styles/main.css';
import 'react-toastify/dist/ReactToastify.css';
import Toast from 'components/modules/Toast/Toast';
import Login from 'pages/Login';
import Milestone from 'pages/Milestone';
import LogoutWork from 'pages/LogoutWork';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { verifyUserState } from 'api/login/api';

function App() {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['accessToken']);
  useEffect(() => {
    verifyUserState(cookies.accessToken, dispatch);
  },[])
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
