import { postApi } from 'utils/httpApi';
/**
 * 
 * @param img: File
 * @reurn {"message": string, "imageUrl": string}
 */
export const uploadImgAPI = async (
  image: FormData
) => {
  
  const res = await fetch(`${process.env.REACT_APP_IMG_SERVER_UPLOAD}`, {
    method: 'POST',
    // credentials: 'include',
    body: image
  });
  return res;
}