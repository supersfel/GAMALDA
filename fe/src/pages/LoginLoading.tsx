import { useSearchParams } from 'react-router-dom';

const LoginLoading = () => {
  // 쿼리스트링의 code와 state를 받아옴
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state')
  console.log(code, state);
  return (
    <>
      {`${code}, ${state}`}
    </>
  )
}

export default LoginLoading;