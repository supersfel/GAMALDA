import { getNaverData } from 'api/project/api';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const LoginCallback = () => {
  // 쿼리스트링의 code와 state를 받아옴
  const [searchParams, setSearchParams] = useSearchParams();
  const code: string | null = searchParams.get('code');
  const state: string | null = searchParams.get('state')

  useEffect(() => {
    // getNaverData()
  })

  //  로딩 화면 보여줄 예정
  return (
    <>
      callback
      <br />
      <br />
      <br />
      <br />
      {`${code}, ${state}`}
    </>
  )
}

export default LoginCallback;