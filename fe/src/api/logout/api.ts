import axios from 'axios';


export async function logout() {
  axios.get(`${process.env.REACT_APP_MAIN_URL}/naver_login/logout`)
    .then((res) => {
      if (res.data === 'cookieDeleted') {
        console.log('쿠키 삭제됨');
        window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
      }
    })
    .catch((e) => {
      throw e;
  })
}