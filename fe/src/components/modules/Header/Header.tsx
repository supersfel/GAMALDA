import Icon from 'components/modules/Icon/Icon';
import { type } from 'os';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as GamaldaIcon} from 'statics/img/icon/gamaldaIcon.svg';
import {ReactComponent as UserIcon} from 'statics/img/icon/userIcon.svg';


type User = {
  //  authorized는 api로 가져오는 유저 정보중 하나로 로그인 됨을 나타내줌
  authorized : boolean
}




const Header = ({ authorized }: User) => {
  const [modalIsOpen, setModalOpen] = useState(false);
  return (
    <div className="header">
      <Link to="/">
        <GamaldaIcon width='70px' height='70px'/>
      </Link>

      <div className="login_link">
        {authorized ?
          // <Icon icon={userIcon} link={false} />
          <UserIcon width='50px' height='50px' />
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