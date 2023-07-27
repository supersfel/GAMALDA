import React, { useState } from 'react';
import { ReactComponent as UploadSVG } from 'assets/svg/upload.svg';
import { updateProjectInfoApi } from 'api/project/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { refetchType } from './type';

interface Props {
  title: string;
  img: string;
  refetch: refetchType;
}

const ProjSetInfo = ({ title, img, refetch }: Props) => {
  const [imageSrc, setImageSrc]: any = useState(
    'https://picsum.photos/300/300',
  );
  const [projectName, setProjectName] = useState(title);
  const [thumbnailUrl, setthumbnailUrl] = useState(img);

  const projectId = useParams().projectId as string;

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

  const changeName = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const sendProjectInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const ret = await updateProjectInfoApi(
      projectName,
      thumbnailUrl,
      projectId,
    );

    if (ret.isChange === true) toast.success('이름과 섬네일이 변경되었습니다');
    else toast.error('정상적으로 등록되지 못했습니다.');

    //변경 이후 정보를 다시 받아옴
    refetch();
  };

  return (
    <form className="proj-set-info">
      <div className="name">
        <p>프로젝트 이름</p>
        <input
          type="text"
          className="name-input"
          value={projectName}
          onChange={changeName}
        />
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

        <button className="btn success" onClick={sendProjectInfo}>
          완료
        </button>
      </div>
    </form>
  );
};

export default ProjSetInfo;
