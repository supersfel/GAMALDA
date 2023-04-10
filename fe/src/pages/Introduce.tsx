import Intro_1 from 'components/introduce/Intro_1';
import Header from 'components/modules/Header/Header';
import Intro_2 from 'components/introduce/Intro_2';
import Intro_3 from 'components/introduce/Intro_3';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import axios from 'axios';

const Introduce = () => {
  const [cookies] = useCookies(['accessToken']);
  // console.log(cookies.accessToken);
  useEffect(() => {
    //이거 모듈화 ㄱㄱ
    console.log(cookies)
    axios.post(process.env.REACT_APP_API_URL + '/userverify',
      {
        accessToken: cookies.accessToken
      }
    )
  })
  return (
    <>
      {/* authorized는 api로 가져오는 유저 정보중 하나로 로그인 됨을 나타내줌 */}
      {/* username와 img도 가져와야한다. */}
      <Header authorized={false} userName={'오주현'} />
      <Intro_1 />
      <Intro_2 />
      <Intro_3 />
    </>
  );
};

export default Introduce;
