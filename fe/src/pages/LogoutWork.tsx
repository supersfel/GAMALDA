import { logout } from 'api/logout/api';
import axios from 'axios';
import { useEffect } from 'react';

const LogoutWork = () => {
  //  로그아웃 GET메서드 사용을 위한 페이지
  useEffect(() => {
    logout()
  })
  return (
    <> </>
  )
};

export default LogoutWork;