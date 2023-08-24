import { postApi } from 'utils/httpApi';

/**
 * 계정 관리 페이지에서 유저가 닉네임을 변경할 때 유저이름 변경 요청을 보내는API
 ** POST요청
 * @param accessToken : string
 * @param userName : string 
 * @returns db정보 변경 성공 여부
 */
export const updateUserNameApi = (
  accessToken: string,
  userName: string,
) => {
  return postApi('/account_manage/update_username', {
    userName,
    accessToken
  })
};

/**
 * 계정 관리 페이지에서 유저가 이미지를 변경할 때 유저 이미지 변경 요청을 보내는API
 ** POST요청
 * @param accessToken : string
 * @param userImgUrl : string
 * @returns db정보 변경 성공 여부
 */
export const updateUserImgApi = (
  accessToken: string,
  userImgUrl: string,
) => {
  return postApi('/account_manage/update_userimage', {
    userImgUrl,
    accessToken
  })
};