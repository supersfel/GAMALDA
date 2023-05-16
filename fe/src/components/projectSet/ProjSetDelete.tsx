import React from 'react';

const ProjSetDelete = () => {
  return (
    <div className="proj-set-delete">
      <p>프로젝트 삭제</p>
      <p>한번 삭제한 프로젝트는 다시 되돌릴 수 없습니다.</p>
      <p>그래도 정말 삭제하시겠습니까?</p>
      <div className="btn del-btn">삭제</div>
    </div>
  );
};

export default ProjSetDelete;
