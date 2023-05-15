import { ReactComponent as PlusIcon } from 'assets/svg/plus.svg';
import { ReactComponent as PeopleGroup } from 'assets/svg/peopleGroup.svg';
import { COLOR } from 'utils/utils';
import { useDispatch, useSelector } from 'react-redux';

import MyPageProject from 'components/modules/MyPageProject/MyPageProject';
import { setModal } from 'modules/modal';
import { RootState } from 'modules/index';
import Modal from 'components/modules/Modal/ModalPortal';
import MyProjectModal from 'components/modules/Modal/myPage/MyProjectModal';
import EnterProjectModal from 'components/modules/Modal/myPage/EnterProjectModal';
import { useCookies } from 'react-cookie';
import { getProjectsInfo } from 'api/project/api';
import { useQuery } from 'react-query';

const MyPageContentArea = () => {

  const dispatch = useDispatch()

  const [cookies] = useCookies(['accessToken']);
  
  const projectInfo = useQuery({
    queryKey: ['projectInfo', cookies],
    queryFn: async () => {
      const projectInfo = await getProjectsInfo(cookies.accessToken);
      return projectInfo
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
          {projectInfo.data.map((e: any, index: number) => {
            return <MyPageProject key={index} projectInfo={e}/>
          })}
        </div>
      </div>
      {/* 여기에 전체 모달 생성 */}
      {
        openModal.idx === 0 && openModal.name === 'generateProjcet' ?
        <Modal children={<MyProjectModal reqType={'generate'}/>}/>
        : openModal.idx === 0 && openModal.name === 'enterProjectWithCode' ?
          <Modal children={<MyProjectModal reqType={'enterWithCode'}/>}/> 
          : openModal.idx === 0 && openModal.name === 'enterProject' ?
            <Modal children={<EnterProjectModal />} />
            : null
      }
    </div>
  )
}

export default MyPageContentArea