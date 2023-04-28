import { ReactComponent as GamaldaIcon } from 'assets/svg/gamaldaIcon.svg';
import { offModal } from 'modules/modal';
import { useDispatch } from 'react-redux';

const GenerateProjectModal = () => {
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
            <p>새 프로젝트 생성</p>
          </div>
        </div>


        <div className='contents_area'>
          <div className='form_setting'>
            <p>일정 내용</p>
            <input
              className="border_box"
              type="text"
              placeholder="내용을 입력 해주세요"
            />
          </div>
          <div className='form_setting'>
            <p>팀 주제</p>
            <input
              className="border_box"
              type="text"
              placeholder="내용을 입력 해주세요"
            />
          </div>
          
        </div>
        <div className="btn block-change-btn">
            추가
          </div>
        
      </form>
    </div>
  )
}

export default GenerateProjectModal