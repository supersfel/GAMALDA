import React from 'react';
import { selectType } from './type';
import ProjSetInfo from './ProjSetInfo';
import ProjSetPrivate from './ProjSetPrivate';
import ProjSetCode from './ProjSetCode';
import ProjSetMember from './ProjSetMember';
import ProjSetDelete from './ProjSetDelete';
import ProjSetBack from './ProjSetBack';

interface Props {
  selectItem: selectType;
}

const ProjSetBody = ({ selectItem }: Props) => {
  const showBody = (item: selectType) => {
    switch (item) {
      case 'info':
        return <ProjSetInfo></ProjSetInfo>;
      case 'private':
        return <ProjSetPrivate></ProjSetPrivate>;
      case 'code':
        return <ProjSetCode></ProjSetCode>;
      case 'members':
        return <ProjSetMember></ProjSetMember>;
      case 'delete':
        return <ProjSetDelete></ProjSetDelete>;
      case 'back':
        return <ProjSetBack></ProjSetBack>;
      case '':
        return <></>;
    }
  };

  return <div className="proj-set-body">{showBody(selectItem)}</div>;
};

export default ProjSetBody;
