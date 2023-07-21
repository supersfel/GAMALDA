export const SETUSERLOGIN = 'userInfo/SETUSERLOGIN' as const;
export const SETUSERLOGOUT = 'userInfo/SETUSERLOGOUT' as const;

/**
 * 유저닉네임, 프로필사진주소, 로그인 상태를 인자로 전달.
 * @param nickName 
 * @param profileImgUrl 
 * @param loginState 
 * @returns 
 */
export const setUserLogin = (nickName: string, profileImgUrl: string, loginState: boolean) => ({
  type: SETUSERLOGIN,
  payload: {
    nickName,
    profileImgUrl,
    loginState
  }
});
export const setUserLogout = () => ({
  type: SETUSERLOGOUT,
});