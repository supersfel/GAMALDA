import { ReactComponent as UploadSvg } from 'assets/svg/upload.svg';
import { ReactComponent as UserIcon } from 'assets/svg/user.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import { useState } from 'react';
import { formData, resizingImg } from 'utils/imageManage';
import { toast } from 'react-toastify';
import { updateUserImgApi, updateUserNameApi } from 'api/accountManage/api';
import { useCookies } from 'react-cookie';
import { deleteImgApi, uploadImgAPI } from 'api/imgServer/api';

const AccountManage = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const [cookies] = useCookies(['accessToken']);
  const [userName, setUserName] = useState('');
  const [userImgObj, setUserImgObj] = useState<{ file: File | null, fileName: string }>({ file: null, fileName: '' });
  
  const setChangedUserImg = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const resizedImg = await resizingImg(e.target.files[0], 3, 130);
      if (resizedImg.state === 'instance error' || resizedImg.state === 'fileType error') {
        toast.error('올바르지 않은 파일 형식입니다');
        return;
      }
      setUserImgObj(resizedImg);
    }
  }
  
  const updateChangedInfo = async (
    userName: string,
    userImg: string
  ) => {
    const reg1 = /[~!@#$%";'^,&*()_+|</>=>`?:{[\}]/g;
    const reg2 = /\s/g;

    if (userName === '' && userImg === '') {
      return;
    }

    if (userName.match(reg1) || userName.match(reg2)) {
      toast.error('이름에 특수기호 및 공백의 사용은 불가능 합니다');
      return;
    }

    // 업데이트할 이미지가 있는 경우
    if (userImg) {
      const userImgFormData = await formData(userImgObj.file);
      const imgFileName = userInfo.profileImgUrl.split('/')[4];

      if (!userImgFormData) {
        toast.error('이미지 작업 도중 오류가 발생했습니다. 다시 시도해주세요.');
        return;
      }
        
      // 유저 이미지가 기본이거나 없는 경우
      if (!(userInfo.profileImgUrl === '' || userInfo.profileImgUrl === process.env.REACT_APP_NAVER_DEFAULT_IMG)) {
        const isPastImgDelete = await deleteImgApi(imgFileName);
        if (isPastImgDelete.state === "error") {
          toast.error('이미지 작업 도중 오류가 발생했습니다. 다시 시도해주세요.');
          return;
        }
      }

      const imgUploadRes = await uploadImgAPI(userImgFormData);
      const updateUserImgResult = await updateUserImgApi(cookies.accessToken, imgUploadRes.imageUrl);
      // 이미지만 업데이트할 때
      if (userName === '') {
        updateUserImgResult ? toast.success('이미지 변경에 성공했습니다. 새로고침 후 확인해주세요') : toast.error('이미지 업데이트에 오류가 발생했습니다. 잠시후 다시 시도해주세요.');
        return;
      }
      //  이름과 이미지를 같이 업데이트할 때
      if (userName) {
        const updateUserNameResult = await updateUserNameApi(cookies.accessToken, userName);
        updateUserImgResult && updateUserNameResult ? toast.success('계정 정보 변경에 성공했습니다. 새로고침 후 확인해주세요') : toast.error('계정 정보 변경에 실패했습니다. 양식을 확인해주세요');
        return;
      }
    }
    // 이름만 업데이트할 때
    if (userName && userImg === '') {
      const updateUserNameResult = await updateUserNameApi(cookies.accessToken, userName);
      updateUserNameResult ? toast.success('계정 정보 변경에 성공했습니다. 새로고침 후 확인해주세요') : toast.error('계정 정보 변경에 실패했습니다. 양식을 확인해주세요');
      return;
    }
  };
  
  return (
    <div className="box_area flex_center manage_box">
      <div className="contents_area">
        <div className="user_info_area">
          <div className="user_img flex_center">
            {userInfo.profileImgUrl === process.env.REACT_APP_NAVER_DEFAULT_IMG || userInfo.profileImgUrl === '' ? <UserIcon /> : <img src={userInfo.profileImgUrl} alt='changedImg'/>}
          </div>
          <div className="title_area">
            <p className="title_text">계정 설정</p>
            <p className="username_text">{userInfo.nickName}</p>
            <p className="useremail_text">{userInfo.userEmail}</p>
          </div>
        </div>
        <div className="manage_user_name_area flex_center">
          <p className="manage_user_text">유저 이름</p>
          <input
            className="manage_user_name_input"
            type="text"
            placeholder={userInfo.nickName}
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>
        <div className="manage_user_img_area flex_center">
          <div className="manage_user_text_area">
            <p className="manage_user_text">유저 이미지</p>
            <p className="warning_text_grey">이미지를 업로드하는 도중 화질이 낮아질 수 있습니다.</p>
          </div>
          
          <div className="manage_user_imgbox">
            <div className='img_area'>
              {
                userImgObj.fileName ? <img className='user_img' src={userImgObj.fileName} alt='userImg' />
                  : (userInfo.profileImgUrl ? <img src={userInfo.profileImgUrl} alt='changedImg' />
                    : <UserIcon />
                  )
              }
            </div>
            <label htmlFor="mu_img_up">
              <div className="btn btn_imgupload">
                <UploadSvg />
                <p>업로드</p>
              </div>
            </label>
            <input
              id="mu_img_up"
              type="file"
              accept="image/jpg, image/png, image/jpeg"
              className="upload_img"
              onChange={(e) => setChangedUserImg(e)}
            />
          </div>
        </div>
        <div className='btn btn_complete' onClick={() => updateChangedInfo(userName, userImgObj.fileName)}>완료</div>
      </div>
    </div>
  )
};

export default AccountManage;