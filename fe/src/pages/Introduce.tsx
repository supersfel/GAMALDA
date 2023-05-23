import Intro_1 from 'components/introduce/Intro_1';
import Header from 'components/modules/Header/Header';
import Intro_2 from 'components/introduce/Intro_2';
import Intro_3 from 'components/introduce/Intro_3';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { verifyUserState } from 'api/login/api';

const Introduce = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['accessToken']);
  useEffect(() => {
    verifyUserState(cookies.accessToken, dispatch, true);
  }, []);
  return (
    <>
      {/* authorized는 api로 가져오는 유저 정보중 하나로 로그인 됨을 나타내줌 */}
      {/* username와 img도 가져와야한다. */}
      <Header />
      <Intro_1 />
      <Intro_2 />
      <Intro_3 />
    </>
  );
};

export default Introduce;
