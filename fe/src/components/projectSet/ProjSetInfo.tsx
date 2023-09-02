import React, { useState } from 'react';
import { ReactComponent as UploadSVG } from 'assets/svg/upload.svg';
import { updateProjectInfoApi } from 'api/project/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { refetchType } from './type';
import gamaldaIcon from 'assets/png/gamaldaIcon.png';
import { formData, resizingImg } from 'utils/imageManage';
import { deleteImgApi, uploadImgAPI } from 'api/imgServer/api';

interface Props {
  title: string;
  img: string;
  refetch: refetchType;
  subject: string;
}

const ProjSetInfo = ({ title, img, refetch, subject }: Props) => {
  const [projectName, setProjectName] = useState(title);
  const [projectSubject, setProjectSubject] = useState(subject);
  console.log(projectSubject)
  const [thumbnailUrl, setthumbnailUrl] = useState<{ file: File | null, fileName: string }>({ file: null, fileName: '' });
  const projectId = useParams().projectId as string;

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      toast.error('올바르지 않은 파일 형식입니다');
      return;
    }
    const resizedImg = await resizingImg(e.target.files[0], 6, 300);
    if (resizedImg.state === 'instance error' || resizedImg.state === 'fileType error') {
      toast.error('올바르지 않은 파일 형식입니다');
      return;
    }
    setthumbnailUrl(resizedImg);
  };

  const changeName = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const changeSubject = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectSubject(e.target.value);
  };

  const sendProjectInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const reg1 = /[~!@#$%";'^,&*()_+|</>=>`?:{[\}]/g;
    let imageUrl = ''

    if (projectName.match(reg1) || projectName === '') {
      toast.error('제목에 특수기호 및 공란 사용은 불가능 합니다');
      return;
    }
    // 이미지 변경이 있는 경우
    if (thumbnailUrl.file) {
      const userImgFormData = await formData(thumbnailUrl.file);
      if (!userImgFormData) {
        toast.error('이미지 작업 도중 오류가 발생했습니다. 다시 시도해주세요.');
        return;
      }
      
      const imgUploadRes = await uploadImgAPI(userImgFormData);
      if (imgUploadRes.state !== 'success') {
        toast.error('이미지 작업 도중 오류가 발생했습니다. 다시 시도해주세요.');
        return;
      }

      if (img !== '') {
        const pastImgUrl = img.split('/')[4];
        const deletePastImgRes = await deleteImgApi(pastImgUrl);
        if (deletePastImgRes.state === 'error') {
          toast.error('이미지 작업 도중 오류가 발생했습니다. 다시 시도해주세요.');
          return;
        }
      }
      imageUrl = imgUploadRes.imageUrl;
    }

    const ret = await updateProjectInfoApi(
      projectName,
      imageUrl,
      projectSubject,
      projectId,
    );

    if (ret.isChange === true) toast.success('프로젝트 정보가 변경되었습니다');
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
      <div className="subject">
        <p>프로젝트 주제</p>
        <input
          type="text"
          className="name-input"
          value={projectSubject}
          onChange={changeSubject}
        />
      </div>
      <div className="img">
        <p>프로젝트 섬네일</p>
        {/* 이미지는 후에 다시 작업 */}
        <div className="container">
          <img src={thumbnailUrl.fileName ? thumbnailUrl.fileName : ( img ? img : gamaldaIcon )} alt="" />
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
            accept="image/jpg, image/png, image/jpeg"
            onChange={(e) => onUpload(e)}
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
