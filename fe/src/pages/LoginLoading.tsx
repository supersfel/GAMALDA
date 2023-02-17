import { getNaverCode } from 'api/project/api';
import { useSearchParams } from 'react-router-dom';

interface Data {
  code: string;
  state: string;
}

const LoginLoading = () => {
  // 쿼리스트링의 code와 state를 받아옴
  const [searchParams, setSearchParams] = useSearchParams();
  const code: string | null = searchParams.get('code');
  const state = searchParams.get('state')
  console.log(code, state);
  getNaverCode(code!);

  return (
    <>
      {`${code}, ${state}`}
    </>
  )
}

export default LoginLoading;