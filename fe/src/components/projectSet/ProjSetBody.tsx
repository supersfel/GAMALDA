import React, { useEffect, useState } from 'react';
import { projInfoType, selectType } from './type';
import ProjSetInfo from './ProjSetInfo';
import ProjSetPrivate from './ProjSetPrivate';
import ProjSetCode from './ProjSetCode';
import ProjSetMember from './ProjSetMember';
import ProjSetDelete from './ProjSetDelete';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProjectInfoByProjectId } from 'api/project/api';
import { useQuery } from 'react-query';

interface Props {
  selectItem: selectType;
  projInfo: projInfoType | undefined;
}

const ProjSetBody = ({ selectItem, projInfo }: Props) => {
  const projectId = useParams().projectId as string;
  const navigate = useNavigate();

  //기능 추가시에 react-query로 값들 넣어줄 것

  useEffect(() => {
    if (selectItem !== 'back') return;
    navigate(`/milestone/${projectId}`);
  }, [selectItem]);

  const showBody = (item: selectType) => {
    switch (item) {
      case 'info':
        return (
          <ProjSetInfo
            title={projInfo ? projInfo.title : ''}
            img={projInfo ? projInfo.img : ''}
          ></ProjSetInfo>
        );
      case 'private':
        return (
          <ProjSetPrivate
            isPrivate={projInfo ? projInfo.isPrivate : 0}
          ></ProjSetPrivate>
        );
      case 'code':
        return (
          <ProjSetCode
            code={projInfo ? projInfo.invitationCode : ''}
          ></ProjSetCode>
        );
      case 'members':
        return <ProjSetMember></ProjSetMember>;
      case 'delete':
        return <ProjSetDelete></ProjSetDelete>;
      default:
        return <></>;
    }
  };

  return <div className="proj-set-body">{showBody(selectItem)}</div>;
};

export default ProjSetBody;
