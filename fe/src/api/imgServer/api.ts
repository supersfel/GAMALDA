import { postApi } from 'utils/httpApi';
/**
 * 이미지 서버에 이미지를 업로드하는 API
 * @param img: File
 * @reurn {"message": string 업로드 성공 여부, "imageUrl": string 이미지 주소url}
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