import { createProject, enterProject } from 'api/project/api';
import { ReactComponent as GamaldaIcon } from 'assets/svg/gamaldaIcon.svg';
import { RootState } from 'modules/index';
import { offModal } from 'modules/modal';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const EnterProjectWithPwModal = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.userInfo).userId;
  const [cookies] = useCookies(['accessToken']);
  const [subjectCondition, setSubjectCondition] = useState(true);
  const [enterCode, setEnterCode] = useState('');
  const [enterCodeCondition, setenterCodeCondition] = useState(true);

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(offModal());
  };

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
    if (enterCode === '') {
      toast.warning('코드를 올바르게 입력해주세요.');
      return false;
    }
  };

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
            <p>코드로 입장하기</p>
          </div>
        </div>
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
        <div className="btn block-change-btn" onClick={handleEnterProject}>
          추가
        </div>

      </form>
    </div>
  )
};

export default EnterProjectWithPwModal