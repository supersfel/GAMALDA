import { getProjectInfoByProjectId } from 'api/project/api';
import Header from 'components/modules/Header/Header';
import ProjSetBody from 'components/projectSet/ProjSetBody';
import ProjSetSelect from 'components/projectSet/ProjSetSelect';
import { projInfoType, selectType } from 'components/projectSet/type';
import useVerifingUserState from 'hooks/useVerifingUserState';
import { RootState } from 'modules/index';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkCorrectPerson } from 'utils/milestone';

const ProjectSet = () => {
  useVerifingUserState(true);
  const user = useSelector((state: RootState) => state.userInfo);
  const navigate = useNavigate();
  const [selectItem, setSelectItem] = useState<selectType>('');
  const projectId = useParams().projectId as string;
  const [projInfo, setProjInfo] = useState<projInfoType>();

  const projInfoQuery = useQuery({
    queryKey: ['projInfo', projectId],
    queryFn: async () => {
      const data = (await getProjectInfoByProjectId(
        +projectId,
      )) as projInfoType;
      return data;
    },
  });

  useEffect(() => {
    if (projInfoQuery.isError)
      toast.error('프로젝트를 불러오는 중 오류가 발생했습니다');
    else setProjInfo(projInfoQuery.data);
  }, [projInfoQuery.data]);

  useEffect(() => {
    if (!projInfo) return;
    const flg = checkCorrectPerson(
      projInfo.teamMember.split(','),
      1,
      user.userId,
    );
    if (!flg) {
      toast.warning('프로젝트 설정 권한이 없습니다');
      navigate(`/milestone/${projectId}`);
    }
  }, [projInfo]);

  return (
    <>
      <Header />
      <div className="projectset-body">
        <ProjSetSelect
          selectItem={selectItem}
          setSelectItem={setSelectItem}
          projInfo={projInfo}
        ></ProjSetSelect>
        <ProjSetBody
          refetch={projInfoQuery.refetch}
          selectItem={selectItem}
          projInfo={projInfo}
        ></ProjSetBody>
      </div>
    </>
  );
};

export default ProjectSet;
