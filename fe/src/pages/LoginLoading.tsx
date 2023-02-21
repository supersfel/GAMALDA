import { getNaverCode } from 'api/project/api';
import { useSearchParams } from 'react-router-dom';

const LoginCallback = () => {
  // 쿼리스트링의 code와 state를 받아옴
  const [searchParams, setSearchParams] = useSearchParams();
  const code: string | null = searchParams.get('code');
  const state: string | null = searchParams.get('state')
  // console.log(code, state);
  // getNaverCode(code!, state!);

  return (
    <>
      callback page
      <br />
      <br />
      <br />
      <br />
      {`${code}, ${state}`}
    </>
  )
}

export default LoginCallback;