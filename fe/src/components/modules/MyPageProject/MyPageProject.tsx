import { getMemberInfosByUserIdApi, getProjectInfoByProjectId } from 'api/project/api';
import gamaldaIcon from 'assets/png/gamaldaIcon.png';
import { setModal } from 'modules/modal';
import { getOneProjectInfo } from 'modules/projectInfo';
import { useDispatch } from 'react-redux';

interface ProjectInfo {
  projectInfo: {
    img: string;
    invitationCode: string;
    isPrivate: number;
    manager: string;
    projectId: number;
    subject: string;
    teamMember: string;
    title: string;
  };
}

interface UserInfo {
  nickname: string,
  profileImage: string,
  userId: number
}

/**
 * 프로젝트 이미지와 제목을 prop으로 전달해주면 이를 이용
 */
const MyPageProject = (props: ProjectInfo) => {
  const { projectId, title, subject, img } = props.projectInfo;
  const dispatch = useDispatch();
  const openEnterProjectModal = async (e: React.MouseEvent) => {
    const projectInfo = await getProjectInfoByProjectId(projectId);
    const userNicknames = (await getMemberInfosByUserIdApi(projectInfo.teamMember)).userInfos.map((e: UserInfo) => e.nickname).join(', ');

    const crrProInfo = {
      projectId: projectInfo.projectId,
      invitationCode: projectInfo.invitationCode,
      title: projectInfo.title,
      subject: projectInfo.subject,
      img: projectInfo.img,
      teamMember: userNicknames,
      isPrivate: projectInfo.isPrivate
    };

    dispatch(getOneProjectInfo(crrProInfo));
    dispatch(setModal('enterProject', 0));
  };

  return (
    <div className="project_box" onClick={openEnterProjectModal}>
      <img src={img !== '' ? img : gamaldaIcon} alt=""></img>
      <div className="project_title_area">{`${title} - ${subject}`}</div>
    </div>
  );
};

export default MyPageProject;
