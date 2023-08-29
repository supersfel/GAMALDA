/**
 * 이미지 서버에 이미지를 업로드하는 API
 * @param img: File
 * @reurn 
 ** 성공 : { state: "success", message: "success", imageUrl: imageUrl }
 */
export const uploadImgAPI = async (
  image: FormData
) => {
  const res = await fetch(`${process.env.REACT_APP_IMG_SERVER_UPLOAD}`, {
    method: 'POST',
    body: image
  });
  return res.json();
}

/**
 * 이미지 서버에 이미지 파일을 삭제해주는 API
 * @param imgageName : string 삭제하고자 하는 이미지 파일명
 * @returns 
 ** 성공 : { state: "success", message: "성공" }
 ** 실패 : { state: "error", message: "이미지가 없습니다" } 혹은 { state: "error", message: "이미지 삭제 중 오류 발생" }
 */
export const deleteImgApi = async(
  imgageName : string
) => {
  const res = await fetch(`${process.env.REACT_APP_IMG_SERVER_DELETE}/${imgageName}`, {
    method: 'DELETE',
  })
  return res.json();
}