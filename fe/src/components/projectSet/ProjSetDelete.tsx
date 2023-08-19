import { deleteProjectApi } from 'api/project/api';
import { RootState } from 'modules/index';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  managerId: string;
}

const ProjSetDelete = ({ managerId }: Props) => {
  const projectId = useParams().projectId as string;
  const user = useSelector((state: RootState) => state.userInfo);
  const navigate = useNavigate();

  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    if (+user.userId === +managerId) setIsManager(true);
    else setIsManager(false);
  }, [managerId]);

  const deleteProject = async () => {
    // eslint-disable-next-line no-restricted-globals
    const flg = confirm('정말 삭제하시겠습니까?');

    if (!flg) {
      return;
    }
    if (!isManager) {
      toast.warning('관리자가 아닙니다.');
      return;
    }
    const ret = await deleteProjectApi(projectId);
    if (!ret) toast.error('프로젝트가 정상적으로 삭제되지 못했습니다.');
    else {
      toast.success('프로젝트가 삭제되었습니다.');
      navigate('/');
    }
  };

  return (
    <div className="proj-set-delete">
      {isManager ? (
        <>
          <p>프로젝트 삭제</p>
          <p>한번 삭제한 프로젝트는 다시 되돌릴 수 없습니다.</p>
          <p>그래도 정말 삭제하시겠습니까?</p>
          <div onClick={deleteProject} className="btn del-btn">
            삭제
          </div>
        </>
      ) : (
        <p>프로젝트 삭제는 관리자만 진행할 수 있습니다.</p>
      )}
    </div>
  );
};

export default ProjSetDelete;
