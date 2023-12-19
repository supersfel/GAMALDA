// import { updateUserImgApi, updateUserNameApi } from 'api/accountManage/api';
// import { deleteImgApi, uploadImgAPI } from 'api/imgServer/api';
// import { toast } from 'react-toastify';
// import { formData } from 'utils/imageManage';

// const updateChangedInfo = async (
//     userName: string,
//     userImg: string
//   ) => {
//     const reg1 = /[~!@#$%";'^,&*()_+|</>=>`?:{[\}]/g;
//     const reg2 = /\s/g;

//     if (userName === '' && userImg === '') {
//       return;
//     }

//     if (userName.match(reg1) || userName.match(reg2)) {
//       toast.error('이름에 특수기호 및 공백의 사용은 불가능 합니다');
//       return;
//     }

//     // 업데이트할 이미지가 있는 경우
//     if (userImg) {
//       const userImgFormData = await formData(userImgObj.file);
//       const imgFileName = userInfo.profileImgUrl.split('/')[4];

//       if (!userImgFormData) {
//         toast.error('이미지 작업 도중 오류가 발생했습니다. 다시 시도해주세요.');
//         return;
//       }
        
//       // 유저 이미지가 기본이거나 없는 경우
//       if (!(userInfo.profileImgUrl === '' || userInfo.profileImgUrl === process.env.REACT_APP_NAVER_DEFAULT_IMG)) {
//         const isPastImgDelete = await deleteImgApi(imgFileName);
//         if (isPastImgDelete.state === "error") {
//           toast.error('이미지 작업 도중 오류가 발생했습니다. 다시 시도해주세요.');
//           return;
//         }
//       }

//       // 이미지 서버로 업로드 한 이미지 주소
//       const imgUploadRes = await uploadImgAPI(userImgFormData);
//       // 유저 db에 이미지 데이터를 업데이트한 결과
//       const updateUserImgResult = await updateUserImgApi(cookies.accessToken, imgUploadRes.imageUrl);
//       // 이미지만 업데이트할 때
//       if (userName === '') {
//         updateUserImgResult ? toast.success('이미지 변경에 성공했습니다. 새로고침 후 확인해주세요') : toast.error('이미지 업데이트에 오류가 발생했습니다. 잠시후 다시 시도해주세요.');
//         return;
//       }
//       //  이름과 이미지를 같이 업데이트할 때
//       if (userName) {
//         const updateUserNameResult = await updateUserNameApi(cookies.accessToken, userName);
//         updateUserImgResult && updateUserNameResult ? toast.success('계정 정보 변경에 성공했습니다. 새로고침 후 확인해주세요') : toast.error('계정 정보 변경에 실패했습니다. 양식을 확인해주세요');
//         return;
//       }
//     }
//     // 이름만 업데이트할 때
//     if (userName && userImg === '') {
//       const updateUserNameResult = await updateUserNameApi(cookies.accessToken, userName);
//       updateUserNameResult ? toast.success('계정 정보 변경에 성공했습니다. 새로고침 후 확인해주세요') : toast.error('계정 정보 변경에 실패했습니다. 양식을 확인해주세요');
//       return;
//     }
//   };
export const test = () => {
  return;
}