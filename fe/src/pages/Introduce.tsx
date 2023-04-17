import Intro_1 from 'components/introduce/Intro_1';
import Header from 'components/modules/Header/Header';
import Intro_2 from 'components/introduce/Intro_2';
import Intro_3 from 'components/introduce/Intro_3';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules/index';

const Introduce = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  console.log(userInfo);
  return (
    <>
      <Header />
      <Intro_1 />
      <Intro_2 />
      <Intro_3 />
    </>
  );
};

export default Introduce;
