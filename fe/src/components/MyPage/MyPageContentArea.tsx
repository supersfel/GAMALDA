import { ReactComponent as PlusIcon } from 'assets/svg/plus.svg';
import { ReactComponent as PeopleGroup } from 'assets/svg/peopleGroup.svg';
import { COLOR } from 'utils/utils';
import { useDispatch, useSelector } from 'react-redux';

import MyPageProject from 'components/modules/MyPageProject/MyPageProject';
import { setModal } from 'modules/modal';
import { RootState } from 'modules/index';
import Modal from 'components/modules/Modal/ModalPortal';
import EnterProjectWithPwModal from 'components/modules/Modal/myPage/EnterProjectWithPwModal';
import EnterProjectModal from 'components/modules/Modal/myPage/EnterProjectModal';
import { useCookies } from 'react-cookie';
import { getProjectsInfo } from 'api/project/api';
import { useQuery } from 'react-query';
import GenProjectModal from 'components/modules/Modal/myPage/GenProjectModal';

interface ProjectInfo {
  img: string,
  invitationCode: string,
  isPrivate: number,
  manager: string,
  projectId: number,
  subject: string,
  teamMember: string,
  title: string,
}

const MyPageContentArea = () => {

  const dispatch = useDispatch()

  const [cookies] = useCookies(['accessToken']);

  const projectInfo = useQuery({
    queryKey: ['projectInfo', cookies],
    queryFn: async () => {
      const projectInfo = await getProjectsInfo(cookies.accessToken);
      if (projectInfo[0] === undefined || projectInfo[0] === null) {
        return false
      }
      return (
        projectInfo.map((e: ProjectInfo) => {
          return <MyPageProject key={e.projectId} projectInfo={e} />
        })
      );
    }
  })
  const openGenModal = () => {
    dispatch(setModal('generateProjcet', 0));
  }

  const openEntModalWithCode = () => {
    dispatch(setModal('enterProjectWithCode', 0));
  }

  const openModal = useSelector((state: RootState) => state.modal);
  if (projectInfo.isLoading) {
    return (
      <div>
        loading
      </div>
    )
  }

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
            <div className='btn' onClick={openGenModal}>
              <PlusIcon className='svg' fill={COLOR.white} />
              <p>새 프로젝트</p>
            </div>
            <div className='btn' onClick={openEntModalWithCode}>
              <PeopleGroup className='svg' fill={COLOR.white} />
              <p>코드로 입장</p>
            </div>
          </div>
        </div>
        <div className='project_list_area_column'>
          {/* 데이터의 갯수만큼 아래의 컴포넌트 생성 */}
          {
            projectInfo.data ? projectInfo.data : <div>프로젝트를 생성해주세요</div>
          }
        </div>
      </div>
      {/* 여기에 전체 모달 생성 */}
      {
        openModal.idx === 0 && openModal.name === 'generateProjcet' ?
          <Modal children={<GenProjectModal />} />
          : openModal.idx === 0 && openModal.name === 'enterProjectWithCode' ?
            <Modal children={<EnterProjectWithPwModal />} />
            : openModal.idx === 0 && openModal.name === 'enterProject' ?
              <Modal children={<EnterProjectModal />} />
              : null
      }
    </div>
  )
}

export default MyPageContentArea