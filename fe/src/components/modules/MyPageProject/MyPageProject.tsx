import { getProjectInfoByProjectId } from 'api/project/api';
import minchoImg from 'assets/testImg/mincho.jpg';
import { setModal } from 'modules/modal';
import { getOneProjectInfo } from 'modules/projectInfo';
import { useDispatch } from 'react-redux';

/**
 * 프로젝트 이미지와 제목을 prop으로 전달해주면 이를 이용 
 */
const MyPageProject = (props?: any) => {
  const { projectId, title, subject, img } = props.projectInfo;
  const dispatch = useDispatch();
  const openEnterProjectModal = async (e: React.MouseEvent) => {
    //여기에 db에서 불러오기? 실시간으로 변할 수 있는 데이터 제공을 위해
    const projectInfo = await getProjectInfoByProjectId(projectId);
    dispatch(getOneProjectInfo(projectInfo))
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