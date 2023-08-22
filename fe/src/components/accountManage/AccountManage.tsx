import { ReactComponent as UploadSvg } from 'assets/svg/upload.svg';
import { ReactComponent as UserIcon } from 'assets/svg/user.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import { useState } from 'react';
import { formData, resizingImg } from 'utils/accountManage';
import { toast } from 'react-toastify';
import { uploadChangedUserInfoApi } from 'api/accountManage/api';
import { useCookies } from 'react-cookie';
import { uploadImgAPI } from 'api/imgServer/api';

const AccountManage = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const [cookies] = useCookies(['accessToken']);

  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');
  const [userImgFile, setUserImgFile] = useState({});
  console.log(userImgFile)
  // console.log(typeof userImg, userImg)
  // userImgFile은 나중에 이미지 서버가 구축이되면 state에 저장후 업로드 시 작업
  // const [userImgFile, setUserImgFile] = useState(null);

  ///////////////// 추후 모듈화 작업 진행 예정
  // 유저 이미지 업로드시 미리보기를 위해 FileReader API를 사용(base64로 인코딩)
  // 추가 정보 링크: https://slaks1005.tistory.com/64
  const uploadUserImgToChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const resizedImg = await resizingImg(e.target.files[0], 3, 130);
      if (resizedImg === 'instance error') {
        return;
      }
      else if (resizedImg === 'fileType error') {
        toast.error('올바르지 않은 파일 형식입니다');
      } else if(resizedImg) {
        setUserImg(`${resizedImg.fileName}`);
        // console.log(resizedImg)
        setUserImgFile(resizedImg.file)
        
      }
    }
  }

  // 이미지(base64로 인코딩된 URL)을formData 형식으로 서버로 파일(이미지 서버 구현되면 진행)
  // 이것도 모듈화 할 수 있음 하자
  const uploadChangedInfo = async (userName: string, userImg: string) => {
    // 조건 처리 수정
    const reg1 = /[~!@#$%";'^,&*()_+|</>=>`?:{[\}]/g;
    const reg2 = /\s/g;
    if (userName.match(reg1) || userName.match(reg2)) {
      toast.error('특수기호 및 공백의 사용은 불가능 합니다');
      return;
    }
    if (userName === '' && userImg === '') {
      return;
      // 여기에서 이미지, 이름 각각 한개만 바뀌지 않았을 때 바뀐 상태를 업로드하는 예외처리 실시
    }
    else {
      const data = await formData(userImgFile)
      console.log(data)
      if (data) {
        // const test = await uploadImgAPI(data)
        // console.log(test)
      }
      
      const result = await uploadChangedUserInfoApi(userName, cookies.accessToken);
      result ? toast.success('계정 정보 변경에 성공했습니다. 새로고침 후 확인해주세요') : toast.error('계정 정보 변경에 실패했습니다. 양식을 확인해주세요');
      return;
    }
    // 이미지 서버와 API 구축 후 formData로 userImg를 만들어주고 api를 통해 보내주는 fe작업까지 하고 커밋.
  }
  ///////////////// 추후 모듈화 작업 진행 예정
  
  return (
    <div className="box_area flex_center manage_box">
      <div className="contents_area">
        <div className="user_info_area">
          <div className="user_img flex_center">
            {userInfo.profileImgUrl === process.env.REACT_APP_NAVER_DEFAULT_IMG ? <UserIcon /> : <img src={userInfo.profileImgUrl} alt='changedImg'/>}
          </div>
          <div className="title_area">
            <p className="title_text">계정 설정</p>
            <p className="username_text">{userInfo.nickName}</p>
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
          <p className="manage_user_text">유저 이미지</p>
          <div className="manage_user_imgbox">
            {/*여기에 이미지 생성*/}
            <div className='img_area'>
              {userImg ? <img className='user_img' src={userImg} alt='userImg' /> : <UserIcon />}
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
              onChange={(e) => uploadUserImgToChange(e)}
            />
          </div>
        </div>
        <div className='btn btn_complete' onClick={() => uploadChangedInfo(userName, userImg)}>완료</div>
      </div>
    </div>
  )
};

export default AccountManage;