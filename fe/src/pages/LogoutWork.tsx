import axios from 'axios';
import { useEffect } from 'react';

const LogoutWork = () => {
  //  로그아웃 GET메서드 사용을 위한 페이지
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_MAIN_URL}/naver_login/logout`)
      .then((res) => {
        console.log(res.data)
        if (res.data === 'cookieDeleted') {
          console.log('쿠키 삭제됨');
          window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
        }
    })
  })
  return (
    <> </>
  )
};

export default LogoutWork;
