import { useParams } from 'react-router';

const LoginLoading = () => {
  const code = useParams(); //  이는 쿼리 스트리을 받아오는 코드로 다시 작성해보자.
  console.log(code)
  return (
    <>
      {code}
    </>
  )
}

export default LoginLoading;