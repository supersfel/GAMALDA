import { createProject, enterProject } from 'api/project/api';
import { ReactComponent as GamaldaIcon } from 'assets/svg/gamaldaIcon.svg';
import { RootState } from 'modules/index';
import { offModal } from 'modules/modal';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface MyProjectModalType {
  reqType: string;
}

const MyProjectModal = ({ reqType }: MyProjectModalType) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.userInfo).userId;
  const [cookies] = useCookies(['accessToken']);

  const [title, setTitle] = useState('');
  const [titleCondition, setTitleCondition] = useState(true);
  const [subject, setSubject] = useState('');
  const [subjectCondition, setSubjectCondition] = useState(true);
  const [enterCode, setEnterCode] = useState('');
  const [enterCodeCondition, setenterCodeCondition] = useState(true);

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(offModal());
  };

  const handleCreateProject = async () => {
    if (!checkFormCorrect()) return;
    
    const newProject = {
      title: title,
      subject: subject,
      img: '',
      teamMember: userId,
      isPrivate: 0,
    };
    const ret = await createProject(newProject, cookies.accessToken);
    dispatch(offModal());
    if (!ret) {
      toast.error('프로젝트가 생성되지 못했습니다.');
      return;
    }
    toast.success('프로젝트가 추가되었습니다. 새로고침 후 프로젝트를 확인하세요.');
  }

  const handleEnterProject = async () => {
    if (!checkFormCorrect()) return;

    const enterInfo = {
      enterCode: enterCode,
      userId: userId
    };
    const ret = await enterProject(enterInfo, cookies.accessToken);
    dispatch(offModal());
    if (!ret) {
      toast.error('입장에 실패했습니다. 코드를 확인해주세요.');
      return;
    }
    else if (ret.isExist) {
      toast.error('이미 참여한 프로젝트입니다.');
      return;
    }
    toast.success('입장에 성공했습니다. 새로고침 후 프로젝트를 확인하세요.');
  }

  const checkFormCorrect = () => {
    if (reqType === 'generate') {
      if (title === '') {
        toast.warning('제목을 올바르게 입력해주세요.');
        return false;
      }
      else if (subject === '') {
        toast.warning('주제를 올바르게 입력해주세요.');
        return false;
      }
    }
    else if (reqType === 'enterWithCode') {
      if (enterCode === '') {
        toast.warning('코드를 올바르게 입력해주세요.');
        return false;
      }
    }
    else {
      toast.warning('에러가 발생했습니다. 다시 시도해주세요.');
      return false;
    }
    return true;
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.length === 0) {
      setTitleCondition(false);
    }
    else {
      setTitleCondition(true);
    }
  }
  const onChangeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    if (e.target.value.length === 0) {
      setSubjectCondition(false);
    }
    else {
      setSubjectCondition(true);
    }
  }

  const onChangeEnterCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnterCode(e.target.value);
    if (e.target.value.length !== 10) {
      setenterCodeCondition(false);
    }
    else {
      setenterCodeCondition(true);
    }
  }

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
            //
            <div className='contents_area'>
              <div className='form_setting'>
                <p>프로젝트 이름</p>
                <input
                  className={`border_box ${titleCondition ? title.length === 0 ? '' : 'pass' : 'not_pass'}`}
                  type="text"
                  placeholder="이름을 입력 해주세요"
                  value={title}
                  onChange={(e) => onChangeTitle(e)}
                ></input>
                <p className={`alert_message ${titleCondition ? 'pass_message' : ''}`}>이름 입력은 필수 입니다.</p>
              </div>
              <div className='form_setting'>
                <p>팀 주제</p>
                <input
                  className={`border_box ${subjectCondition ? subject.length === 0 ? '' : 'pass' : 'not_pass'}`}
                  type="text"
                  placeholder="주제을 입력 해주세요"
                  value={subject}
                  onChange={(e) => onChangeSubject(e)}
                ></input>
                <p className={`alert_message ${subjectCondition ? 'pass_message' : ''}`}>이름 입력은 필수 입니다.</p>
              </div>
            </div>
          )
          :
          (
            //
            <div className='contents_area'>
              <div className='form_setting'>
                <p>입장 코드</p>
                <input
                  className={`border_box ${enterCodeCondition ? enterCode.length === 0 ? '' : 'pass' : 'not_pass'}`}
                  type="text"
                  placeholder="코드를 입력 해주세요"
                  value={enterCode}
                  onChange={(e) => onChangeEnterCode(e)}
                />
                <p className={`alert_message ${subjectCondition ? 'pass_message' : ''}`}>코드 입력은 필수 입니다.</p>
              </div>
            </div>
          )}
        <div className="btn block-change-btn" onClick={reqType === 'generate'? handleCreateProject : handleEnterProject}>
          추가
        </div>
        
      </form>
    </div>
  )
}

export default MyProjectModal