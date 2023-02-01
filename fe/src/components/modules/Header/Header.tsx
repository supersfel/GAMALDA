import { useState } from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as GamaldaIcon} from 'statics/img/icon/gamaldaIcon.svg';
import {ReactComponent as UserIcon} from 'statics/img/icon/userIcon.svg';
import AccountInfoModal from 'components/modules/Modal/AccountInfoModal';

type User = {
  //  authorized는 api로 가져오는 유저 정보중 하나로 로그인 됨을 나타내줌
  authorized : boolean
}

const Header = ({ authorized }: User) => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const onClickButton = () => {
    setModalOpen(!modalIsOpen);
  };
  return (
    <div className="header">
      <Link to="/">
        <GamaldaIcon width='70px' height='70px'/>
      </Link>

      <div className="login_link">
        {authorized ?
          // <button onClick={onClickButton}>
          //   <UserIcon width='50px' height='50px' />
          //   {modalIsOpen && <div>test</div>}
          // </button>
          <div>
            <UserIcon width='50px' height='50px' onClick={onClickButton} />
            {modalIsOpen && <AccountInfoModal onClose={() => setModalOpen(false)} />}
          </div>
          :
          <Link to="/">
            <p>로그인</p>
          </Link>
        }
      </div>
    </div>
  )
}

export default Header;