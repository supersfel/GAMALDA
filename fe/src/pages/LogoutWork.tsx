
import { useEffect } from 'react';
import userLogout from 'hooks/useUserLogout';

const LogoutWork = () => {
  //  로그아웃 GET메서드 사용을 위한 페이지
  useEffect(() => {
    userLogout()
  })
  return (
    <> </>
  )
};

export default LogoutWork;
