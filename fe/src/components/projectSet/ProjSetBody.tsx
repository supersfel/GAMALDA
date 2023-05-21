import React, { useEffect } from 'react';
import { selectType } from './type';
import ProjSetInfo from './ProjSetInfo';
import ProjSetPrivate from './ProjSetPrivate';
import ProjSetCode from './ProjSetCode';
import ProjSetMember from './ProjSetMember';
import ProjSetDelete from './ProjSetDelete';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  selectItem: selectType;
}

const ProjSetBody = ({ selectItem }: Props) => {
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
        return <ProjSetInfo></ProjSetInfo>;
      case 'private':
        return <ProjSetPrivate></ProjSetPrivate>;
      case 'code':
        return <ProjSetCode code="asdfasdfsdfkkkkk"></ProjSetCode>;
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
