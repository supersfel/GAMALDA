import minchoImg from 'assets/testImg/mincho.jpg';
import { setModal } from 'modules/modal';
import { getOneProjectInfo } from 'modules/projectInfo';
import { useDispatch } from 'react-redux';

/**
 * 프로젝트 이미지와 제목을 prop으로 전달해주면 이를 이용 
 */
const MyPageProject = (props?: any) => {
  const { title, subject, img } = props.projectInfo;
  const dispatch = useDispatch();
  const openEnterProjectModal = (e: React.MouseEvent) => {
    dispatch(getOneProjectInfo(props.projectInfo))
    dispatch(setModal('enterProject', 0));
  }
  
  return (
    <div className='project_box' onClick={openEnterProjectModal}>
      <img src={ img !== '' ? img : minchoImg } alt=''></img>
      <div className='project_title_area'>
        {`${title} - ${subject}`}
      </div>
    </div>
  )
}

export default MyPageProject