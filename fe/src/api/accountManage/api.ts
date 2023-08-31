
/**
 * 계정 관리 페이지에서 유저가 닉네임을 변경할 때 유저이름 변경 요청을 보내는API
 ** PATCH요청
 * @param accessToken : string
 * @param userName : string 
 * @returns db정보 변경 성공 여부
 */
export const updateUserNameApi = async (
  accessToken: string,
  userName: string,
) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/accountmanage/username`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken: accessToken,
      userName: userName
    })
  });
  return res.json()
};

/**
 * 계정 관리 페이지에서 유저가 이미지를 변경할 때 유저 이미지 변경 요청을 보내는API
 ** PATCH요청
 * @param accessToken : string
 * @param userImgUrl : string
 * @returns db정보 변경 성공 여부
 */
export const updateUserImgApi = async (
  accessToken: string,
  userImgUrl: string,
) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/accountmanage/userimage`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "accessToken": accessToken,
      "userImgUrl": userImgUrl
    })
  })
  return res.json();
};