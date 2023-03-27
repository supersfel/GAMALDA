// import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const LoginCallback = () => {
  // 쿼리스트링의 code와 state를 받아옴
  // const [searchParams, setSearchParams] = useSearchParams();
  // const code: string | null = searchParams.get('code');
  // const state: string | null = searchParams.get('state')

  //  로딩 화면 보여줄 예정
  useEffect(() => {
    // axios.get('http://localhost:8080/naver_login/callback')
    fetch('http://localhost:3000/naver_login/callback', {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res)
    })
      .catch((e) => {
      console.log(e)
    })
  })
  return (
    <>
      test
      <br />
      <br />
      <br />
      <br />
      {/* {`${code}, ${state}`} */}
    </>
  )
}

export default LoginCallback;