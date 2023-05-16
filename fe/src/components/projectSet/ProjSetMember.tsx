import React from 'react';
import { ReactComponent as TrashSVG } from 'assets/svg/projset-trash.svg';

interface Props {
  memberList: string[];
}

//후에 memberList기능 구현할때 추가해야함
const ProjSetMember = () => {
  //api로 memberList를 통해서 정보를 받아오도록
  const memberList = [
    {
      profileImage: 'https://picsum.photos/30/30',
      nickName: 'nickname',
    },
    {
      profileImage: 'https://picsum.photos/30/30',
      nickName: 'nickname2',
    },
    {
      profileImage: 'https://picsum.photos/30/30',
      nickName: 'nickname3',
    },
  ];

  return (
    <div className="proj-set-member">
      <p className="title">팀원 목록</p>
      {memberList.map((el) => {
        return (
          <div className="user-block">
            <div className="flex-box">
              <img src={`${el.profileImage}`} alt="" />
              <p>{el.nickName}</p>
            </div>
            <TrashSVG className="trash"></TrashSVG>
          </div>
        );
      })}
    </div>
  );
};

export default ProjSetMember;
