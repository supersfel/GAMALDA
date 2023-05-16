import React from 'react';
import { ReactComponent as UploadSVG } from 'assets/svg/upload.svg';

const ProjSetInfo = () => {
  return (
    <form className="proj-set-info">
      <div className="name">
        <p>프로젝트 이름</p>
        <input type="text" className="name-input" />
      </div>
      <div className="img">
        <p>프로젝트 섬네일</p>
        {/* 이미지는 후에 다시 작업 */}
        <div className="container">
          <img src="https://picsum.photos/300/300" alt="" />
          <label htmlFor="proj-img-file">
            <div className="btn-upload btn">
              <UploadSVG />
              업로드
            </div>
          </label>
          <input type="file" name="file" id="proj-img-file" />
        </div>

        <button className="btn success">완료</button>
      </div>
    </form>
  );
};

export default ProjSetInfo;
