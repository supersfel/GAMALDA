import { ReactComponent as PlusIcon } from 'assets/svg/plus.svg';
import { ReactComponent as PeopleGroup } from 'assets/svg/peopleGroup.svg';
import { COLOR } from 'utils/utils';

import MyPageProject from 'components/modules/MyPageProject/MyPageProject';

const MyPageContentArea = () => {
  
  return (
    <div className='mypage_area'>
      <div className='mypage_contents'>
        <div className='nav'>
          <div className='text_area'>
            <p>
              내 프로젝트
            </p>
          </div>
          <div className='btn_area'>
            <div className='btn'>
              <PlusIcon className='svg' fill={COLOR.white} />
              <p>새 프로젝트</p>
            </div>
            <div className='btn'>
              <PeopleGroup className='svg' fill={COLOR.white} />
              <p>코드로 입장</p>
            </div>
          </div>
        </div>
        <div className='project_list_area_column'>
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          <MyPageProject />
          {/* <div className='project_list_area_row'>
            <div className='project_box'>ddd</div>
            <MyPageProject />
            <div className='project_box'>ddd</div>
          </div>
          <div className='project_list_area_row'>
            <MyPageProject />
            <MyPageProject />
            <MyPageProject />
          </div>
          <div className='project_list_area_row'>
            <div className='project_box'>ddd</div>
            <MyPageProject />
            <div className='project_box'>ddd</div>
          </div>
          <div className='project_list_area_row'>
            <MyPageProject />
            <MyPageProject />
            <MyPageProject />
          </div>
          <div className='project_list_area_row'>
            <MyPageProject />
            <div className='project_box'>ddd</div>
            <MyPageProject />
          </div> */}
        </div>
      </div>
      
    </div>
  )
}

export default MyPageContentArea