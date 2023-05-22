import React from 'react';
import { toast } from 'react-toastify';
import { ReactComponent as SaveSVG } from 'assets/svg/save.svg';

interface Props {
  code: string;
}

const ProjSetCode = ({ code }: Props) => {

    //저장 버튼 누를 시 클립보드 복사
  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(code);

      toast.success('클립보드에 코드가 복사되었습니다.');
    } catch (error) {
      toast.error('복사가 실패되었습니다');
    }
  };

  return (
    <div className="proj-set-code">
      <p className="title">초대코드</p>
      <div className="flex-box">
        <p>{code}</p>
        <SaveSVG className="save-btn" onClick={handleCopyClipBoard}></SaveSVG>
      </div>
    </div>
  );
};

export default ProjSetCode;
