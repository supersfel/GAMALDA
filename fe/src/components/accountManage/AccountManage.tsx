import minchoImg from "assets/testImg/mincho.jpg";
import { ReactComponent as UploadSvg } from 'assets/svg/upload.svg';

const AccountManage = () => {

  return (
    <div className="box_area flex_center manage_box">
      <div className="contents_area">
        <div className="user_info_area">
          <div className="user_img flex_center">
            <img src={minchoImg} alt="" />
          </div>
          <div className="title_area">
            <p className="title_text">계정 설정</p>
            <p className="username_text">유저명</p>
          </div>
        </div>
        <div className="manage_user_name_area flex_center">
          <p className="manage_user_text">유저 이름</p>
          <input
            className="manage_user_name_input"
            type="text"
            placeholder="여기에는 유저명을 가져오고 바뀐것을 체크하는 state와 비교해서 사용하자"
          />
        </div>
        <div className="manage_user_img_area flex_center">
          <p className="manage_user_text">유저 이미지</p>
          <div className="manage_user_imgbox">
            {/** 이미지가 있으면 이미지를 넣어주고 없다면 회색 박스로 대신(퍼블리싱 기간에는 회색 블럭만 출력) */}
            <div className="greybox">
              {/*여기에 이미지 생성*/}
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
              />
            </div>
          </div>
        </div>
        <div className='btn btn_complete'>완료</div>
      </div>
    </div>
  )
}

export default AccountManage;