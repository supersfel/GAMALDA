import { Link } from 'react-router-dom';

type Test = {
  link: boolean;
  icon: string;
}
// link Prop을 이용해서 이미지만 필요할 때와 link와 같이 사용할 때 구분해서 사용가능
const Icon = ({link, icon}:Test) => {
  return (
    <div className="icon_area">
      {link ? 
        <Link to="/">
          <img src={icon} alt='Icon'/>
        </Link>
        :
        <img src={icon} alt='Icon'/>
      }
    </div>
  )
}

export default Icon;