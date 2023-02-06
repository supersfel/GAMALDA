import Nav_Login from 'components/login/Naver_Login'
import getParticles from 'hooks/loginPageSnowAnime';
import { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    getParticles();
  }, []);
  return (
    <>
      <div className="bg"></div>
      <div className="login_page flex_center">
        <Nav_Login />
      </div>
      <div className="particles" id="particles" />
    </>  
  )
}

export default Login;