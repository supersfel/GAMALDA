import React, { useRef, useState } from 'react';
import { ReactComponent as UploadSVG } from 'assets/svg/upload.svg';

const ProjSetInfo = () => {
  const [imageSrc, setImageSrc]: any = useState(
    'https://picsum.photos/300/300',
  );

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };

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
          <img src={imageSrc} alt="" />
          <label htmlFor="proj-img-file">
            <div className="btn-upload btn">
              <UploadSVG />
              업로드
            </div>
          </label>
          <input
            type="file"
            name="file"
            id="proj-img-file"
            onChange={onUpload}
          />
        </div>

        <button className="btn success">완료</button>
      </div>
    </form>
  );
};

export default ProjSetInfo;
