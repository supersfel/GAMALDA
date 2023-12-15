//  process.env.REACT_APP_NAVER_CLIENT_ID 는 네이버에서 생성된 client ID, process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL 는 네이버에서 설정한 콜백 url이다.
export const generateNaverApiUrl = (): string => {
  return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${encodeURI(process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL!)}&state=${process.env.REACT_APP_NAVER_STATE}`;
}