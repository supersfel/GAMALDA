import { updateIsPrivateApi } from 'api/project/api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  isPrivate: number;
}

const ProjSetPrivate = ({ isPrivate }: Props) => {
  const projectId = useParams().projectId as string;
  const [isChecked, setIsChecked] = useState(isPrivate ? true : false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const updateIsPrivate = async () => {
    try {
      const ret = await updateIsPrivateApi(isChecked, projectId);
      if (ret) toast.success('권한이 변경되었습니다');
      else toast.error('권한이 변경되지 못했습니다.');
    } catch (error) {
      toast.error('권한이 변경되지 못했습니다');
      console.log(error);
    }
  };

  useEffect(() => {
    updateIsPrivate();
  }, [isChecked]);

  return (
    <div className="proj-set-private">
      <div className="title">
        <p>Private 설정</p>
        <div className="toggle-btn">
          <label>
            <input
              role="switch"
              type="checkbox"
              className="prvate-btn"
              checked={isChecked}
              onChange={handleToggle}
            />
          </label>
        </div>
      </div>

      <p>팀원이 아닌 다른 사람들이 프로젝트를 볼 수 없습니다</p>
    </div>
  );
};

export default ProjSetPrivate;
