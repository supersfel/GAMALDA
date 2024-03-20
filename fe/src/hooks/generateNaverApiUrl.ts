/**
 * @returns 네이버에 로그인 요청을 보내는 URL
 */
export const generateNaverApiUrl = (): string => {
  return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${encodeURI(process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL!)}&state=${process.env.REACT_APP_NAVER_STATE}`;
}