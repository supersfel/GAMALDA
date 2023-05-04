import { ReactComponent as GamaldaIcon } from 'assets/svg/gamaldaIcon.svg';
import minchoImg from 'assets/testImg/mincho.jpg';
import { useDispatch } from 'react-redux';
import { offModal } from 'modules/modal';

import ProjectInfo from 'components/modules/Modal/myPage/InfoPreset'

const EnterProjectModal = () => {
  const dispatch = useDispatch();

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(offModal());
  };
  
  return (
    <div className='gen_project_box' onClick={closeModal}>
      <form className='modal' onClick={(e: any) => e.stopPropagation()}>
        <div className='title_area'>
          <div className="title">
            <GamaldaIcon width={50} height={50} />
            {/* 여기에 사용될 타이틀은 db에서 불러온 데이터를 redux-state에 한번 저장한 뒤에 불러와 이용한다. */}
            <p>테스트 타이틀</p>
          </div>
        </div>
        <div className='enter_modal_contents_area'>
          <div className='img_area'>
            {/* 이미지 또한 db에서 불러온 데이터를 redux-state에 한번 저장한 뒤에 불러와 이용한다. */}
              <img src={minchoImg} alt="" />
          </div>
          <div className='project_info_area'>
            {/* 아래에 들어갈 infoCategory와 infoContent는 db에서 불러온 데이터를 redux-state에 한번 저장한 뒤에 불러와 이용한다. */}
            <ProjectInfo infoCategory={'주제'} infoContent={'IT'}/>
            <ProjectInfo infoCategory={'생성자'} infoContent={'장기를길러라'} />
            <ProjectInfo infoCategory={'멤버'} infoContent={['장기를길러라', '코미', '마시로', '콩쥐', '팥쥐']}/>
          </div>
        </div>
        {/* closeModal 을 다른 함수로 변경 필수 */}
        <div className="btn block-change-btn" onClick={closeModal}>
            입장
        </div>
        
      </form>
    </div>
  )
}

export default EnterProjectModal;