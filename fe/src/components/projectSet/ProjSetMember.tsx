import React, { useEffect, useState } from 'react';
import { ReactComponent as TrashSVG } from 'assets/svg/projset-trash.svg';
import { useQuery } from 'react-query';
import { refetchType, userInfoType } from './type';
import { getMemberInfosByUserIdApi } from 'api/project/api';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';

interface Props {
  teamMember: string;
  refetch: refetchType;
  managerId: string;
}

//후에 memberList기능 구현할때 추가해야함
const ProjSetMember = ({ teamMember, refetch, managerId }: Props) => {
  //api로 memberList를 통해서 정보를 받아오도록

  const user = useSelector((state: RootState) => state.userInfo);
  const [isManager, setIsManager] = useState(false);

  const userInfoQuery = useQuery({
    queryKey: ['userInfo', teamMember],
    queryFn: async () => {
      const data = (await getMemberInfosByUserIdApi(
        teamMember,
      )) as userInfoType;
      return data;
    },
  });

  useEffect(() => {
    if (+user.userId === +managerId) setIsManager(true);
    else setIsManager(false);
  }, [managerId, teamMember]);

  return (
    <div className="proj-set-member">
      <p className="title">팀원 목록</p>
      {isManager ? (
        userInfoQuery?.data?.userInfos.map((el) => {
          return (
            <div className="user-block">
              <div className="flex-box">
                <img src={`${el.profileImage}`} alt="" />
                <p>{el.nickname}</p>
              </div>
              <TrashSVG className="trash"></TrashSVG>
            </div>
          );
        })
      ) : (
        <div>관리자인 경우에만 팀 목록을 관리할 수 있습니다</div>
      )}
    </div>
  );
};

export default ProjSetMember;
