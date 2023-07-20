
/**
 * 유저 accessToken 삭제하고 삭제 결과 return
 * @return 토큰 삭제 결과
 */
export async function logoutApi() {
  fetch(`${process.env.REACT_APP_API_URL}/naver_login/logout`, {
    method: 'get',
    credentials: 'include'
  })
  const response = await fetch(`${process.env.REACT_APP_API_URL}/naver_login/logout`)
  const isDeleted = (await response.json()).state;
  return isDeleted;
}

/**
 * fetch로 유저 accessToken 검증하고 유저 데이터를 받아옴
 * credentials: 'include' 설정으로 쿠키를 보낼 수 있게 해준다.
 * @param accessToken: string 
 * @return 유저 정보
 */
export async function verifyUserStateApi(accessToken: string) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/userverify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      accessToken: accessToken
    }),
  })
  return await response.json();
}