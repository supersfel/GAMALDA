import { createProject } from 'api/project/api';
import { ReactComponent as GamaldaIcon } from 'assets/svg/gamaldaIcon.svg';
import { RootState } from 'modules/index';
import { offModal } from 'modules/modal';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface ProjectType {
  title: string;
  subject: string;
}

interface MyProjectModalType {
  reqType: string;
}

const MyProjectModal = ({ reqType }: MyProjectModalType) => {
  const dispatch = useDispatch();
  const userNickname = useSelector((state: RootState) => state.userInfo).nickName;
  const [cookies] = useCookies(['accessToken']);

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [enterCode, setEnterCode] = useState('');

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(offModal());
  };

  const handleReqProject = async () => {
    if (!checkFormCorrect()) return;
    const userReqType = reqType;
    
    const newProject = userReqType === 'generate' ?
      {
        invitationCode: '',
        title: title,
        subject: subject,
        img: '',
        teamMember: userNickname,
        isPrivate: 0,
        cookie: cookies.accessToken,
      }
      :
      {
        enterCode: enterCode,
        nickName: userNickname,
      };
    // 구조 개편 필요(생성과 참여시 나누어 작성해야됨)
    const ret = await createProject(newProject);
    dispatch(offModal());
    if (!ret) {
      toast.error('프로젝트가 생성되지 못했습니다.');
      return;
    }
    toast.success('프로젝트가 추가되었습니다.');
    window.location.reload();
  }

  const checkFormCorrect = () => {
    if (reqType === 'generate') {
      if (title === '') {
        toast.warning('제목을 옳바르게 입력해주세요.');
        return false;
      }
      else if (subject === '') {
        toast.warning('주제를 옳바르게 입력해주세요.');
        return false;
      }
    }
    else if (reqType === 'enterWithCode') {
      if (enterCode === '') {
        toast.warning('코드를 옳바르게 입력해주세요.');
        return false;
      }
    }
    else {
      toast.warning('에러가 발생했습니다. 다시 시도해주세요.');
      return false;
    }
    return true;
  };
  
  return (
    <div className='gen_project_box' onClick={closeModal}>
      <form className='modal' onClick={(e: any) => e.stopPropagation()}>
        <div className='title_area'>
          <div className="title">
            <GamaldaIcon width={50} height={50} />
            {reqType === 'generate' ? <p>새 프로젝트 생성</p> : <p>코드로 입장하기</p>}
          </div>
        </div>
        {reqType === 'generate' ?
          (
            <div className='contents_area'>
              <div className='form_setting'>
                <p>일정 내용</p>
                <input
                  className="border_box"
                  type="text"
                  placeholder="내용을 입력 해주세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className='form_setting'>
                <p>팀 주제</p>
                <input
                  className="border_box"
                  type="text"
                  placeholder="내용을 입력 해주세요"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>
          )
          :
          (
            <div className='contents_area'>
              <div className='form_setting'>
                <p>입장 코드</p>
                <input
                  className="border_box"
                  type="text"
                  placeholder="코드를 입력 해주세요"
                  value={enterCode}
                  onChange={(e) => setEnterCode(e.target.value)}
                />
              </div>
            </div>
          )}
        <div className="btn block-change-btn" onClick={handleReqProject}>
          추가
        </div>
        
      </form>
    </div>
  )
}

export default MyProjectModal