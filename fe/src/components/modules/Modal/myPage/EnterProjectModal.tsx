import { ReactComponent as GamaldaIcon } from 'assets/svg/gamaldaIcon.svg';
import minchoImg from 'assets/testImg/mincho.jpg';
import { useDispatch, useSelector } from 'react-redux';
import ProjectInfo from 'components/modules/Modal/myPage/InfoPreset'

import { offModal } from 'modules/modal';
import { offInfoModal } from 'modules/projectInfo';
import { RootState } from 'modules/index';

const EnterProjectModal = () => {
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const { projectId, title, subject, img, teamMember } = useSelector((state: RootState) => state.projectInfo);

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(offModal());
    dispatch(offInfoModal());
  };

  const enterMilestoneProject = (projectId: number) => {
    window.location.href = `${process.env.REACT_APP_MAIN_URL}/milestone/${projectId}`;
  }
  return (
    <div className='gen_project_box' onClick={closeModal}>
      <form className='modal' onClick={(e: any) => e.stopPropagation()}>
        <div className='title_area'>
          <div className="title">
            <GamaldaIcon width={50} height={50} />
            {/* 여기에 사용될 타이틀은 db에서 불러온 데이터를 redux-state에 한번 저장한 뒤에 불러와 이용한다. */}
            <p>{title}</p>
          </div>
        </div>
        <div className='enter_modal_contents_area'>
          <div className='img_area'>
            {/* 이미지 또한 db에서 불러온 데이터를 redux-state에 한번 저장한 뒤에 불러와 이용한다. */}
              <img src={ img !== '' ? img : minchoImg } alt="" />
          </div>
          <div className='project_info_area'>
            {/* 아래에 들어갈 infoCategory와 infoContent는 db에서 불러온 데이터를 redux-state에 한번 저장한 뒤에 불러와 이용한다. */}
            <ProjectInfo infoCategory={'주제'} infoContent={`${subject}`} />
            <ProjectInfo infoCategory={'생성자'} infoContent={teamMember.split(', ')[0]} />
            <ProjectInfo infoCategory={'멤버'} infoContent={teamMember.split(', ')} />
          </div>
        </div>
        <div className="btn block-change-btn" onClick={()=>enterMilestoneProject(projectId)}>
          입장
        </div>
        
      </form>
    </div>
  )
}

export default EnterProjectModal;